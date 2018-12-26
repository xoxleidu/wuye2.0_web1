var BASE_URL = "http://192.168.88.6:5000/";

var API_URL = "http://60.10.139.124:5500/mock/42/";

var dict = {
  //全局字典
  BASE_URL: BASE_URL, //web站点路径
  API_URL: API_URL, //API具体路径

  PAY_MODE: [
    {
      label: "现金",
      value: 0
    },
    {
      label: "银联",
      value: 1
    },
    {
      label: "支付宝",
      value: 2
    },
    {
      label: "微信",
      value: 3
    }
  ],

  HL_MODE: [
    {
      label: "红票",
      value: 0
    },
    {
      label: "蓝票",
      value: 1
    }
  ],

  ENABLE_MODE: [
    {
      label: "启用",
      value: 0
    },
    {
      label: "停用",
      value: 1
    }
  ],

  PRICING_MODE: [
    {
      label: "111",
      value: 0
    },
    {
      label: "2222",
      value: 1
    }
  ]

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
