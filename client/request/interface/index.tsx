import request from "../../utils/request";

// 添加接口
export const postInterface = (param?: any) =>
    request("post", "/interface", param);

// 修改接口
export const putInterface = (param?: any) =>
    request("put", `/interface/${param.id}`, param);

// 获取接口
export const getInterface = (param?: any) =>
    request("get", `/interface/${param.id}`, param);

// 删除接口
export const deleteInterface = (param?: any) =>
    request("delete", `/interface/${param.id}`, param);
