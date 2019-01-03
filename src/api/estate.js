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
  return ajax.post("/office/add", query);
};

export const deleteOffice = officeId => {
  var query = {
    officeId: officeId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/office/delete", query);
};

export const updateOffice = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/office/update", query);
};

export const getOfficeList = query => {
  return ajax.get("/office/getList", {params:query});
};

export const getOffice = officeId => {
  return ajax.get("/office/getById?officeId=" + officeId);
};

export const getOfficeAll = () => {
  return ajax.get("/office/getAll");
};

export const getOfficeTree = () => {
  return ajax.get("/office/gettree");
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
  return ajax.post("/community/add", query);
};

export const deleteCommunity = communityId => {
  var query = {
    communityId: communityId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/community/delete", query);
};

export const updateCommunity = query => {
  delete query.officeName;
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/community/update", query);
};

export const getCommunityList = query => {
  return ajax.get("/community/getList", {params:query});
};

export const getCommunity = communityId => {
  return ajax.get("/community/getById?communityId=" + communityId);
};

export const getCommunityAll = () => {
  return ajax.get("/community/getAll");
};

export const getCommunityTree = () => {
  return ajax.get("/community/gettree");
};

export const autochargingCommunity = query => {
  query = {
    communityId: query.communityId,
    autoCharge: query.autoCharge
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/community/autocharging", query);
};

export const getCommunityAutocharging = () => {
  return ajax.get("/community/autocharging");
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
  console.log(query)
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/building/add", query);
};

export const deleteBuilding = buildingId => {
  var query = {
    buildingId: buildingId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/building/delete", query);
};

export const updateBuilding = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/building/update", query);
};

export const getBuildingList = query => {
  
  return ajax.get("/building/getList", {params:query});
};

export const getBuilding = buildingId => {
  return ajax.get("/building/getById?buildingId=" + buildingId);
};

/**
 * 物产
 * @param {} query 
 */

export const getEstateList = query => {
  return ajax.get("/estate/getList", query);
};

/**
 *电表接口
 addBuilding 
 deleteBuilding 
 deleteManyBuilding 
 updateBuilding 
 getBuilding
 */


export const addAmmeter = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/ammeter/add", query);
};

export const deleteAmmeter = query => {
  query = {
    ammeterId: query.ammeterId,
    estateId: query.estateId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/ammeter/delete", query);
};

export const updateAmmeter = query => {
  console.log(query)
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/ammeter/update", query);
};

export const getAmmeterList = query => {
  return ajax.get("/ammeter/getList", { params: query });
};

export const getAmmeter = query => {
  return ajax.get("/ammeter/getById", { params: query });
};


export const activationAmmeter = query => {
  query = {
    ammeterId:query.ammeterId,
    enable:query.enable
  }
  console.log(query)
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/ammeter/enable", query);
};