<template>
  <div>
    <user-select v-on:userSelect="user($event)"></user-select>
    <date-select v-on:dateSelect="date($event)"></date-select>
    <community-select v-on:communitySelect="community($event)"></community-select>
    <office-select v-on:officeSelect="office($event)"></office-select>
    <dict-select class="base-select" v-model="testData" :dict="$dict.ROLE_MODE"></dict-select>
    <role-select class="base-select" v-model="testData"></role-select>
  </div>
</template>
<script>
import userSelect from "@/components/select/user-select.vue";
import dateSelect from "@/components/select/date-select.vue";
import communitySelect from "@/components/select/community-select.vue";
import officeSelect from "@/components/select/office-select.vue";
import dictSelect from "@/components/select/dict-select.vue";
import roleSelect from "@/components/select/role-select.vue";
export default {
  name: "group",
  components: {
    userSelect,
    dateSelect,
    communitySelect,
    officeSelect,
    dictSelect,
    roleSelect
  },
  data(){
    return {
      testData:""
    }
  },
  methods: {
    user(msg) {
      console.log(msg);
    },
    date(msg) {
      console.log(msg);
    },
    community(msg) {
      console.log(msg);
    },
    product(msg) {
      console.log(msg);
    },
    pay(msg) {
      console.log(msg);
    },
    hl(msg) {
      console.log(msg);
    },
    office(msg) {
      console.log(msg);
    }
  }
};
</script>