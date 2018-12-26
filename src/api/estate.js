export * from "./user.js";
import ajax from "./ajax.js";

export const getEstateType = query => {
  // query = qs.stringify(query);
  return ajax.get("/product/listestatetype", query);
};

/**
 * 办公室接口
 * addOffice
 * deleteOffice
 * updateOffice
 * getOfficeTree
 * getOffice
 */
export const addOffice = query => {
  // query = qs.stringify(query);
  var req = {
    officeName: query.officeName
  };
  console.log(query);
  return ajax.post("/community/add", req);
};

export const deleteOffice = query => {
  // query = qs.stringify(query);
  var req = {
    officeId: query.officeId
  };
  return ajax.post("/community/delete", req);
};

export const updateOffice = query => {
  // query = qs.stringify(query);
  var req = {
    officeName: query.officeName,
    officeId: query.officeId
  };
  console.log(query);
  return ajax.post("/community/update", req);
};

export const getOfficeTree = query => {
  // query = qs.stringify(query);
  return ajax.get("/office/gettree", query);
};

export const getOffice = query => {
  // query = qs.stringify(query);
  return ajax.get("/office/getlist", query);
};

/**
 * 小区接口
 * addCommunity
 * deleteCommunity
 * deleteManyCommunity
 * updateCommunity
 * getCommunityTree
 * getCommunity
 */
export const addCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityName: query.communityName,
    officeId: query.id
  };
  console.log(query);
  return ajax.post("/community/add", req);
};

export const deleteCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityId: query.id
  };
  return ajax.post("/community/delete", req);
};

export const deleteManyCommunity = query => {
  // query = qs.stringify(query);
  return ajax.post("/community/deletemany", query);
};

export const updateCommunity = query => {
  // query = qs.stringify(query);
  var req = {
    communityId: query.communityId,
    communityName: query.communityName,
    officeId: query.id
  };
  console.log(query);
  return ajax.post("/community/update", req);
};

export const getCommunityTree = query => {
  // query = qs.stringify(query);
  return ajax.get("/community/gettree", query);
};

export const getCommunity = query => {
  // query = qs.stringify(query);
  return ajax.get("/community/getlist", query);
};

/**
 *楼号接口
 addBuilding 
 deleteBuilding 
 deleteManyBuilding 
 updateBuilding 
 getBuilding
 */

export const addBuilding = data => {
  return ajax.post("/building/add", data);
};

export const deleteBuilding = data => {
  return ajax.post("/building/delete", data);
};

export const deleteManyBuilding = data => {
  return ajax.post("/building/deletemany", data);
};

export const updateBuilding = data => {
  return ajax.post("/building/update", data);
};

export const getBuilding = query => {
  return ajax.get("/building/getlist", query);
};
