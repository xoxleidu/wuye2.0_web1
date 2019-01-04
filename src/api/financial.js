export * from "./user.js";
import ajax from "./ajax.js";

/**
 * 支出接口
 *
 */
export const addPay = query => {
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/pay/add", query);
};

export const deletePay = query => {
  query = {
    payId: query.payId
  };
  query = JSON.parse(JSON.stringify(query));
  return ajax.post("/pay/delete", query);
};

export const getPayList = query => {
  return ajax.get("/pay/getList", { params: query });
};
