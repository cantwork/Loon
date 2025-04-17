const url = $request.url;
const responseBody = $response.body;

if (url.includes('https://snp.tenpay.com/cgi-bin/snpgw_unified_newsinfo.fcgi')) {
  try {
    let data = JSON.parse(responseBody);
    
    // 移除 adinfo
    delete data.adinfo;
    
    // 检查并修改 news_info.content.data
    if (data.news_info && data.news_info.content && data.news_info.content.data) {
      const dataArray = data.news_info.content.data;
      if (dataArray.length > 0 && dataArray[0].desc === '点击上方图片开户') {
        dataArray.splice(0, 1);
      }
    }
    
    $done({ body: JSON.stringify(data) });
  } catch (e) {
    console.log('Error processing response:', e);
    $done({ body: responseBody });
  }
} else {
  $done({ body: responseBody });
}
