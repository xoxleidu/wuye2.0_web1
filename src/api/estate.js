export * from "./user.js";
import ajax from "./ajax.js";

export const getEstateType = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listestatetype", query);
};
export const getCommunityTree = query => {
  // query = qs.stringify(query);
  return ajax.get("/community/gettree", query);
};

export const getOfficeTree = query => {
  // query = qs.stringify(query);
  return ajax.get("/office/gettree", query);
};

export const getOffice = query => {
  // query = qs.stringify(query);
  return ajax.get("/office/getlist", query);
};

export const addCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityName: query.communityName,
    officeId: query.id
  };
  console.log(query);
  return ajax.post("/community/add", req);
};

export const updateCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityName: query.communityName,
    officeId: query.id
  };
  console.log(query);
  return ajax.post("/community/update", req);
};

export const deleteCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    id: query.id
  };
  return ajax.post("/community/delete", req);
};

export const deleteManyCommunity = query => {
  // query = qs.stringify(query);
  return ajax.post("/community/deletemany", query);
};

export const getEstate = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listestate", query);
};
