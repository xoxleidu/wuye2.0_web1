//user API
import ajax from "./ajax.js";
// import qs from "qs";
//用户管理
// export const getUser = query => {
//   query = Object.assign(
//     {
//       page: 1,
//       size: 10,
//       user_name: ""
//     },
//     query
//   );
//   return ajax.get("/list", {
//     params: query
//   });
// };



export const login = query => {
  return ajax.post("/user/login", query);
};

export const get = query => {
  // query = qs.stringify(query);
  return ajax.get("/user/getlist", query);
};

export const getUser = query => {
  // query = qs.stringify(query);
  return ajax.get("/user/getlist", query);
};

export const activationUser = query => {
  // query = qs.stringify(query);
  var req = {
    userId:query.id,
    state:query.state
  }
  console.log(query)
  return ajax.post("/user/activation",req);
};

export const addUser = query => {
  // query = qs.stringify(query);
  return ajax.post("/user/add", query);
};

export const updateUser = query => {
  // query = qs.stringify(query);
  return ajax.post("/user/update", query);
};

export const deleteUser = query => {
  // query = qs.stringify(query);
  return ajax.post("/user/delete", query);
};

export const deleteManyUser = query => {
  // query = qs.stringify(query);
  return ajax.post("/user/deletemany", query);
};



export const verifyPassWord = date => {
  // query = qs.stringify(query);
  return ajax.post("/user/verpass", date);
};
export const updatePassWord = date => {
  // query = qs.stringify(query);
  return ajax.post("/user/updatepassword", date);
};