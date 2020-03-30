const domain = "http://localhost:1768";

function getRequestUrl(method: string, url: string, params?: any) {
    url = url.indexOf("http") > -1 ? url : `${domain}${url}`;
    if (method === "get") {
        let paramsArr: any[] = [];
        params = params || {};
        Object.keys(params).forEach(key => {
            paramsArr.push(`${key}=${params[key]}`);
        });
        let suffix =
            paramsArr.length > 0 ? (url.indexOf("?") > -1 ? "&" : "?") : "";
        return `${url}${suffix}${paramsArr.join("&")}`;
    }
    return url;
}

function getRequestBody(method: string, params?: any) {
    if (["post", "put"].indexOf(method) > -1 && params) {
        return JSON.stringify(params);
    }
    return undefined;
}

function getHeaders(headers: any) {
    headers = headers || {};
    return {
        "Content-Type": "application/json; charset=utf-8",
        ...headers
    };
}

// 统一请求封装
function request(method: string, url: any, params?: any, options?: any) {
    const requestUrl = getRequestUrl(method, url, params);
    const requestBody = getRequestBody(method, params);
    return fetch(requestUrl, {
        method,
        body: requestBody,
        ...options,
        headers: getHeaders(options?.headers)
    }).then(response => response.json());
}

export default request;
