//user API
import ajax from "./ajax.js";
// import qs from "qs";
//用户管理
export const getUser = query => {
  query = Object.assign(
    {
      page: 1,
      size: 10,
      user_name: ""
    },
    query
  );
  return ajax.get("/list", {
    params: query
  });
};

export const addUser = query => {
  // query = qs.stringify(query);
  return ajax.post("/add", query);
};

export const login = query => {
  return ajax.post("/login", query);
};
