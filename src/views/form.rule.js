import { rules } from "@/utils/rules.js";
export default {
  ...rules,
  name: [
    {
      trigger: "blur",
      required: true,
      message: "必须输入名称"
    },
    {
      pattern: /^[0-9a-zA-Z]+$/,
      message: "只能输入字母和数字！"
    },
    {
      pattern: /^.{11}$/,
      message: "必须输入11位"
    }
  ]
};
