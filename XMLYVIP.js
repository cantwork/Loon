if ($request) {
    (async () => {
        try {
            const fetchCookie = async () => {
                const url = "https://wxpusher.zjiecode.com/api/message/U94SeIYIt7MvmBaFf2pzl7lfFJ042F6f";
                const headers = {
                    "Host": "wxpusher.zjiecode.com",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                    "Sec-Fetch-Dest": "document"
                };
                const response = await new Promise((resolve, reject) => {
                    $httpClient.get({ url, headers }, (error, response, body) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({ statusCode: response.status, body });
                        }
                    });
                });

                const html = response.body;
                const match = html.match(/<p[^>]*>([^<]+)<\/p>/);
                const cookie = match ? match[1].trim() : null;

                if (cookie) {
                    let headers = $request.headers;
                    headers["Cookie"] = cookie;
                    $done({ headers });
                } else {
                    $done({});
                }
            };
            await fetchCookie();
        } catch (error) {
            $done({});
        }
    })();
} else {
    $done({});
}
