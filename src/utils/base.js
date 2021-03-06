var BASE_URL = "http://192.168.88.6:5000/";
//var API_URL = "http://localhost:8080/tenement/";
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

  ESTATETYPE_MODE: [
    {
      label: "房产",
      value: 1
    },
    {
      label: "商铺",
      value: 2
    },
    {
      label: "地下室",
      value: 3
    },
    {
      label: "地上车位",
      value: 4
    },
    {
      label: "地下车位",
      value: 5
    },
    {
      label: "车库",
      value: 6
    },
    {
      label: "其他物产",
      value: 7
    }
  ],
  ROLE_MODE: [
    {
      label: "test",
      value: 0
    },
    {
      label: "业务员",
      value: 1
    },
    {
      label: "AAA",
      value: 2
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
