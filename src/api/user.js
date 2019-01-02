//user API
import ajax from "./ajax.js";
//用户管理
export const login = query => {
  return ajax.post("/login", query);
};

export const getUserList = query => {
  return ajax.get("/users/getList", {params:query});
};

export const getUser = userId => {
  return ajax.get("/users/getById?userId=" + userId);
};

export const addUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/add", query);
}; 

export const updateUser = query => {
  delete query.crateTime;
  delete query.description;
  delete query.lastLoginTime;
  delete query.officeName;
  delete query.roleName;
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/update", query);
};

export const deleteUser = userId => {
  var query = {
    userId: userId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/delete", query);
};
export const updatePassword = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/updatePassword", query);
};

export const activationUser = query => {
  query = {
    userId: query.userId,
    status: query.status
  };
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

export const deleteRole = roleId => {
  var query = {
    roleId: roleId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/delete", query);
};

export const updateRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/update", query);
};

export const getRoleList = query => {
  return ajax.get("/role/getList", {params:query});
};

export const getRole = roleId => {
  return ajax.get("/role/getById", roleId);
};

export const getRoleAll = () => {
  return ajax.get("/role/getAll");
};

export const activationRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/status", query);
};
