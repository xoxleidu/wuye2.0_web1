var BASE_URL = "http://192.168.88.6:5000/";
var API_URL = "http://192.168.88.6:5000/mock/33/";

var dict = {
  //全局字典
  BASE_URL: BASE_URL, //web站点路径
  API_URL: API_URL //API具体路径
};
if (process.env.NODE_ENV == "production") {
  dict = Object.assign(dict, window.SITE_CONFIG);
}
if (process.env.NODE_ENV == "production") {
  //发布时，用public中的config.js声明的全局变量 覆盖API路径
  dict = Object.assign(dict, window.BEIDOU_CONFIG);
}
import utils from "@/utils/utils";
export { utils, dict };
