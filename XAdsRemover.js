/*
 * XAdsRemover
 * Author: ChatGPT
 * Target: Remove promotedMetadata
 */

(function () {
  try {
    let obj = JSON.parse($response.body);

    // 判断是否广告 entry
    function isAdEntry(entry) {
      try {
        return JSON.stringify(entry).includes("promotedMetadata");
      } catch (e) {
        return false;
      }
    }

    // 递归处理
    function clean(data) {
      if (!data || typeof data !== "object") return;

      // 🔥 处理 timeline entries
      if (data.entries && Array.isArray(data.entries)) {
        data.entries = data.entries.filter(entry => !isAdEntry(entry));
      }

      // 🔥 删除 promotedMetadata 字段（兜底）
      if (data.promotedMetadata) {
        delete data.promotedMetadata;
      }

      // 递归深入
      for (let key in data) {
        clean(data[key]);
      }
    }

    clean(obj);

    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    console.log("X Ads Remove Error:", e);
    $done({});
  }
})();
