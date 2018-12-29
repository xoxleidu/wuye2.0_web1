//user API
import ajax from "./ajax.js";
//用户管理
export const login = query => {
  return ajax.post("/login", query);
};

export const getUserList = query => {
  return ajax.get("/users/getList", query);
};

export const getUser = userId => {
  return ajax.get("/users/getById?userId=" + userId);
};

export const addUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/add", query);
};

export const updateUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/update", query);
};

export const deleteUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/delete", query);
};
export const updatePassword = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/updatePassword", query);
};

export const activationUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/status", query);
};

/**
 * 角色
 */
export const addRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/", query);
};

export const deleteRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/delete", query);
};

export const updateRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/update", query);
};

export const getRoleList = query => {
  return ajax.get("/role/getList", query);
};

export const getRole = roleId => {
  return ajax.get("/role/getById", roleId);
};

export const activationRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/status", query);
};
