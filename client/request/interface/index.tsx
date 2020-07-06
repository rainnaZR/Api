import request from "../../utils/request";

// 添加菜单分类
export const postModule = (param?: any) => request("post", "/module", param);

// 获取菜单列表
export const getModuleList = (param?: any) => request("get", "/module", param);

// 获取单个分类
export const getModule = (param?: any) =>
    request("get", `/module/${param.id}`, param);

// 更新单个分类
export const putModule = (param?: any) =>
    request("put", `/module/${param.id}`, param);

// 删除单个项目
export const deleteModule = (param?: any) =>
    request("delete", `/module/${param.id}`, param);

// 添加接口
export const postInterface = (param?: any) =>
    request("post", "/interface", param);
