<template>
  <div>
    <user-select v-on:userSelect="user($event)"></user-select>
    <date-select v-on:dateSelect="date($event)"></date-select>
    <product-select v-on:productSelect="product($event)"></product-select>
    <community-select v-on:communitySelect="community($event)"></community-select>
    <pay-select v-on:paySelect="pay($event)"></pay-select>
    <hl-select v-on:hlSelect="hl($event)"></hl-select>
  </div>
</template>
<script>
import userSelect from "@/components/select/userSelect.vue";
import dateSelect from "@/components/select/dateSelect.vue";
import communitySelect from "@/components/select/communitySelect.vue";
import productSelect from "@/components/select/productSelect.vue";
import paySelect from "@/components/select/paySelect.vue";
import hlSelect from "@/components/select/hlSelect.vue";
export default {
  name: "group",
  components: { userSelect,dateSelect,communitySelect,productSelect,paySelect,hlSelect },
  methods: {
    user(msg) {
      console.log(msg)
    },
    date(msg) {
      console.log(msg)
    },
    community(msg) {
      console.log(msg)
    },
    product(msg) {
      console.log(msg)
    },
    pay(msg) {
      console.log(msg)
    },
    hl(msg) {
      console.log(msg)
    }
  }
};
</script>