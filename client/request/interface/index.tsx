import request from "../../utils/request";

// 添加接口
export const postInterface = (param?: any) =>
    request("post", "/interface", param);

// 删除接口
export const deleteInterface = (param?: any) =>
    request("delete", `/interface/${param.id}`, param);
