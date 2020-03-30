import request from "../../utils/request";

// 新增项目
export const postData = (param?: any) => request("post", "/projects", param);

// 获取项目列表
export const getDataList = (param?: any) => request("get", "/projects", param);

// 获取单个项目
export const getData = (param?: any) =>
    request("get", `/projects/${param.id}`, param);

// 更新单个项目
export const putData = (param?: any) =>
    request("put", `/projects/${param.id}`, param);

// 删除单个项目
export const deleteData = (param?: any) =>
    request("delete", `/projects/${param.id}`, param);
