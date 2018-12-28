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
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/office/", query);
};

export const deleteOffice = officeId => {
  return ajax.delete(`/office/${officeId}`);
};

export const updateOffice = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.put(`/office/${query.officeId}/`, query);
};

export const getOfficeList = query => {
  return ajax.get("/office/", query);
};

export const getOffice = officeId => {
  return ajax.get(`/office/${officeId}`);
};

export const getOfficeTree = query => {
  return ajax.get("/office/gettree", query);
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
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/community/", query);
};

export const deleteCommunity = communityId => {
  return ajax.delete(`/community/${communityId}`);
};

export const deleteManyCommunity = query => {
  return ajax.post("/community/deletemany", query);
};

export const updateCommunity = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.put(`/community/${query.communityId}/`, query);
};

export const getCommunityList = query => {
  return ajax.get("/community/", query);
};

export const getCommunity = communityId => {
  return ajax.get(`/community/${communityId}`);
};

export const getCommunityTree = query => {
  return ajax.get("/community/gettree", query);
};

/**
 *楼号接口
 addBuilding 
 deleteBuilding 
 deleteManyBuilding 
 updateBuilding 
 getBuilding
 */

export const addBuilding = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/building/", query);
}

export const deleteBuilding = communityId => {
  return ajax.delete(`/building/${communityId}`);
};


export const updateBuilding = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.put(`/building/${query.buildingId}/`, query);
};

export const getBuildingList = query => {
  return ajax.get("/building/", query);
};

export const getBuilding = buildingId => {
  return ajax.get(`/building/${buildingId}`);
};