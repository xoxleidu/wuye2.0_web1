<template>
  <div>
    <user-select v-on:userSelect="user($event)"></user-select>
    <datetodate-select v-on:dateSelect="date($event)"></datetodate-select>
    <onedate-select v-on:dateSelect="date($event)"></onedate-select>
    <community-select v-on:communitySelect="community($event)"></community-select>
    <office-select v-on:officeSelect="office($event)"></office-select>
    <dict-select class="base-select" v-model="testData" :dict="$dict.ROLE_MODE"></dict-select>
    <role-select class="base-select" v-model="testData"></role-select>
    <img-upload v-model="testData"></img-upload>
  </div>
</template>
<script>
import userSelect from "@/components/select/user-select.vue";
import datetodateSelect from "@/components/select/datetodate-select.vue";
import onedateSelect from "@/components/select/onedate-select.vue";
import communitySelect from "@/components/select/community-select.vue";
import dictSelect from "@/components/select/dict-select.vue";
import officeSelect from "@/components/select/office-select.vue";
import roleSelect from "@/components/select/role-select.vue";
import imgUpload from "@/components/select/img-upload.vue";
export default {
  name: "group",
  components: {
    userSelect,
    datetodateSelect,
    communitySelect,
    officeSelect,
    dictSelect,
    roleSelect,
    imgUpload,
    onedateSelect
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