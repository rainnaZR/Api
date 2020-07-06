import request from "../../utils/request";

// 添加接口
export const postInterface = (param?: any) =>
    request("post", "/interface", param);
