import {BACKEND_ADDR} from "../config";


export const getFullAPIAddress = (url, params) => {
    // Decode URI if it was in %% format, it's important
    // when we receive next_url in pagination
    url = decodeURI(url);
    url = url.startsWith("http://") ? url : BACKEND_ADDR + url;
    let pos = 0;
    for(let key in params) {
        let value = params[key];
        if (value) {
            url += ((pos === 0) ? "?" : "&") + key + "=" + value;
            console.log("URL:4", key, url)
            pos++;
        }

    }
    return url
};



export const getApiById = (api, id, params) => {

    if (api.includes(":id")) api = api.replace(":id", id.toString()); else api += id;

    api += (!api.endsWith("/")) ? "/": "";
    return getFullAPIAddress(api, params);
};