// import { defineEventHandler } from 'h3';
// // 导入 jsdom
// import { JSDOM } from 'jsdom';

// // 辅助函数：使用 XPath 获取所有匹配的元素
// function selectXPathNodes(document, xpathExpression) {
//     const nodes = [];
//     const iterator = document.evaluate(
//         xpathExpression,
//         document,
//         null, // Namespace resolver
//         document.defaultView.XPathResult.ORDERED_NODE_ITERATOR_TYPE,
//         null
//     );
//     let node;
//     while ((node = iterator.iterateNext())) {
//         nodes.push(node);
//     }
//     return nodes;
// }

// export default defineEventHandler(async (event) => {
//     const requestHeaders = getHeaders(event);
//     // console.log('Request Headers:', requestHeaders);
//     const headersToForward = {
//         ...requestHeaders,
//         host: undefined,
//     };

//     const code = 'HODV-21627'
//     // ⚠️ 建议：添加 User-Agent 伪装，以减少被反爬虫检测的几率
//     const responseHtml: string = await $fetch(`https://www.javbus.com/${code}`, {
//         method: 'GET',
//         headers: headersToForward,
//         // headers: {
//         //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         //     'Cookie': 'starinfo=glyphicon%20glyphicon-minus; genreinfo=glyphicon%20glyphicon-plus; existmag=mag; PHPSESSID=5em00bhalj335pp6ke4uhmamf3'
//         //   }
//     });
//     // return responseHtml
//     // console.log('Fetched HTML length:', responseHtml);
//     // // --- 核心修改：使用 JSDOM 解析 HTML 字符串 ---
//     console.log(responseHtml)
//     const result = {}

//     const dom = new JSDOM(responseHtml);
//     const document = dom.window.document;

    
//     // 目标 XPath 表达式
//     const xpathExpression = `//div[@id='star-div']//a[@class='avatar-box']//span/text()`; // 现在应该能获取到结果了

//     // 使用 jsdom 提供的 document.evaluate API
//     const resultNodes = selectXPathNodes(document, xpathExpression);

//     // 标题
//     const titleExpression = `//div[@class="container"]/h3`
//     const tileNode = selectXPathNodes(document, titleExpression)[0];
//     const title = tileNode.textContent.replace(code, '').trim()
//     result.title = title

//     // 发行日期
//     const infoExpression = `//div[@class="container"]//div["info"]/p`
//     const infoNodes = selectXPathNodes(document, infoExpression);
//     for (const node of infoNodes) {
//         const innerHTML = node.innerHTML
//         console.log(innerHTML)
//         if(innerHTML.indexOf("發行日期") > -1) {
//             console.log("-----------------------")
//             result.publishDate = innerHTML.match(/\d{4}-\d{2}-\d{2}/)[0]
//         }
//     }
//     // const publishDate = publishNode[0].textContent
//     // console.log(resultNodes);
//     // for (const node of resultNodes) {
//     //     // const starName = selectXPathNodes(node, `//span/text()`)[0]?.textContent.trim();
//     //     console.log('Star Name:', node.textContent);
//     // }

    
//     return result
// });