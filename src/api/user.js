//user API
import ajax from "./ajax.js";
//用户管理
export const login = query => {
  return ajax.post("/login/", query);
};

export const getUserList = query => {
  return ajax.get("/users/", query);
};

export const getUser = userId => {
  return ajax.get(`/users/${userId}`);
};

export const addUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/users/", query);
};

export const updateUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.put(`/users/${query.userId}/`, query);
};

export const deleteUser = userId => {
  return ajax.delete(`/users/${userId}`);
};
export const updatePassword = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.patch(`/users/${query.userId}/`, query, {
    params: {
      m: "password"
    }
  });
};

export const activationUser = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.patch(`/users/${query.userId}/`, query, {
    params: {
      m: "status"
    }
  });
};


/**
 * 角色
 */

export const getRoleList = query => {
  return ajax.get("/role/", query);
};

export const getRole = roleId => {
  return ajax.get(`/role/${roleId}`);
};

export const addRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/role/", query);
};

export const updateRole = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.put(`/role/${query.roleId}/`, query);
};

export const deleteRole = roleId => {
  return ajax.delete(`/role/${roleId}`);
};