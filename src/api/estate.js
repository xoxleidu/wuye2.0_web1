export * from "./user.js";
import ajax from "./ajax.js";

export const getEstate = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listestate", query);
};
export const getCommunity = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listcommunity", query);
};

export const getcc = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listcc", query);
};

export const getOffice = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listoffice", query);
};

export const addCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityName: query.communityName,
    officeId: query.id
  };
  console.log(query);
  return ajax.post("/product/addcommunity", req);
};

export const updateCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityName: query.communityName,
    officeId: query.id
  };
  console.log(query);
  return ajax.post("/product/updatecommunity", req);
};

export const deleteCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    id: query.id
  };
  return ajax.post("/product/deletecommunity", req);
};

export const deleteManyCommunity = query => {
  // query = qs.stringify(query);
  return ajax.post("/product/deletemanycommunity", query);
};
