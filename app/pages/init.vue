<template>
    <div>
        <h1>File List</h1>
        
        <span> 正在获取第{{ page_number - 1 }}页， 已获取 {{ fileList.length }}/{{ total }}</span>
        <ul>
            <li v-for="file in fileList" :key="file.cid">
                {{ file.fid }} {{ file.n }} 
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    auth: false
})

const fileList = ref([]);
const offset = ref(0);
const total = ref(0);
const limit = ref(30);
const page_number = ref(1);
const max_pages = ref(1); // 设置最大页数以防止无限请求 

onMounted(() => {
    // requestFileLis();
    jav();
})

const jav = async () => {
  const result = await $fetch('/api/javbus')
  console.log(result);   
}
const requestFileLis = async () => {

    if (page_number.value > max_pages.value) {
        console.log("已达到最大请求页数，停止请求。");
        return; // 达到最大页数，停止请求
    }
    // 检查是否已经加载完所有数据
    if (total.value > 0 && fileList.value.length >= total.value ) {
        console.log("所有数据已加载完毕。");
        return; // 递归终止条件
    }
    
    // 计算当前页的 offset
    offset.value = (page_number.value - 1) * limit.value;
    console.log(`正在请求第 ${page_number.value} 页, offset: ${offset.value}`);

    try {
        const res: any = await $fetch('/api/115/files', {
            method: 'GET',
            headers: {
                'Cookie': 'USERSESSIONID=1f041e0d5638cbda4d6dff2e1c6bdccf03e9cb805c95b72296a68ab2b9199c8a; 115_lang=zh; GST=fb837c3cd44fdb8d191f44c8a13a2bf2; UID=334801526_A1_1764387432; CID=cbd06ec48010d2bcf38a063c4b10cf16; SEID=6ec8d805445f9b7b1e096776e490d35f92cfb51f7dc5ec1609b9a5ab41dc0d53a7f59b402fa97b249a926cc7980f8a21083a20f71817c37c865e162d; KID=c7872c4e760b543f8cf62a82d8f70477; acw_tc=0ae5a82517643874339661639e2ae9ff5b34cfe98d93ad7656cfd30ae61b7d; PHPSESSID=s1nk3lbckum6m375r4vs1uq5kk'
            },
            params: {
            "aid": "1",
            "cid": "3306745165511502595",
            "o": "file_name",
            "asc": "1",
            "offset": offset.value,
            "show_dir": "1",
            "limit": limit.value,
            "code": "",
            "scid": "",
            "snap": "0",
            "natsort": "1",
            "record_open_time": "1",
            "count_folders": "1",
            "type": "4",
            "source": "",
            "format": "json",
            "fc_mix": "",
            "star": "",
            "is_share": "",
            "suffix": "",
            "custom_order": ""
        }
        });

        const newFiles = res.data || [];
        const count = res.count || 0; // 总文件数

        // 1. 更新数据
        fileList.value = fileList.value.concat(newFiles);
        total.value = count;
        page_number.value += 1;

        console.log(`本页获取 ${newFiles.length} 条, 总数 ${fileList.value.length}/${total.value}`);

        // 2. 检查是否需要继续
        if (fileList.value.length < total.value && newFiles.length > 0) {
            // 如果还有剩余文件且本页成功获取到数据，则进行下一页递归请求
            await requestFileLis(); // 递归调用，并使用 await 确保等待本页请求完成后再发起下一次请求
        } else {
             console.log("分页加载完成！");
        }

    } catch (error) {
        console.error("请求文件列表失败:", error);
    }
}
</script>
