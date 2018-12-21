export * from "./user.js";
import ajax from "./ajax.js";

export const getProduct = query => {
    // query = qs.stringify(query);
    return ajax.get("/product/listproduct", query);
  };
  export const getCommunity = query => {
    // query = qs.stringify(query);
    return ajax.get("/product/listcommunity", query);
  };

  export const getcc = query => {
    // query = qs.stringify(query);
    return ajax.get("/product/listcc", query);
  };
  
  export const addCommunity = query => {
    // query = qs.stringify(query);
    var req = {
      userId:query.id,
      state:query.state
    }
    console.log(query)
    return ajax.post("/product/add",req);
  };