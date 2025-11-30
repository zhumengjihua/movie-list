<template>
  <div class="max-w-7xl mx-auto p-3 dark:bg-gray-900">
    <h1 class="text-center text-gray-800 dark:text-gray-100 mb-10 text-4xl font-bold">影片列表</h1>
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 px-3">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="movie-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <div class="relative w-full h-50 overflow-hidden">
          <img
            src="https://c0.jdbstatic.com/samples/3n/3nEwba_l_0.jpg"
            :alt="movie.title"
            class="movie-poster-img w-full h-full object-cover transition-transform duration-300"
          />

        </div>
        <div class="p-3">
          <h3 class="text-sm text-gray-800 dark:text-gray-100 mb-0 leading-tight">{{ movie.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-xs mb-0">{{ movie.year }}</p>
          <p class="text-gray-500 dark:text-gray-400 text-xs mb-0">{{ movie.genre }}</p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
    auth: false
})
// 静态假数据
const movies = [
  {
    id: 1,
    title: "肖申克的救赎",
    year: 1994,
    genre: "剧情/犯罪",
    director: "弗兰克·德拉邦特",
    rating: 9.7,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=肖申克的救赎"
  },
  {
    id: 2,
    title: "霸王别姬",
    year: 1993,
    genre: "剧情/爱情",
    director: "陈凯歌",
    rating: 9.6,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=霸王别姬"
  },
  {
    id: 3,
    title: "阿甘正传",
    year: 1994,
    genre: "剧情/爱情",
    director: "罗伯特·泽米吉斯",
    rating: 9.5,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=阿甘正传"
  },
  {
    id: 4,
    title: "泰坦尼克号",
    year: 1997,
    genre: "爱情/灾难",
    director: "詹姆斯·卡梅隆",
    rating: 9.4,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=泰坦尼克号"
  },
  {
    id: 5,
    title: "千与千寻",
    year: 2001,
    genre: "动画/奇幻",
    director: "宫崎骏",
    rating: 9.4,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=千与千寻"
  },
  {
    id: 6,
    title: "盗梦空间",
    year: 2010,
    genre: "科幻/悬疑",
    director: "克里斯托弗·诺兰",
    rating: 9.3,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=盗梦空间"
  },
  {
    id: 7,
    title: "星际穿越",
    year: 2014,
    genre: "科幻/冒险",
    director: "克里斯托弗·诺兰",
    rating: 9.3,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=星际穿越"
  },
  {
    id: 8,
    title: "楚门的世界",
    year: 1998,
    genre: "剧情/科幻",
    director: "彼得·威尔",
    rating: 9.3,
    poster: "https://via.placeholder.com/300x450/4A5568/FFFFFF?text=楚门的世界"
  }
]
</script>

<style scoped>
/* 修复悬停时的图片缩放效果 */
.movie-card:hover .movie-poster-img {
  transform: scale(1.05);
}

/* 暗色模式下的阴影效果调整 */
.dark .movie-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.dark .movie-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
}
</style>