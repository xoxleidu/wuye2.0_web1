<template>
  <div>111</div>
</template>
<script>

export default {
  data() {
    return {};
  },
  created() {
    if (this.$route.query.conmmunityId) {
      console.log(this.$route.query.conmmunityId);
    } else {
      console.log("this.$route.query.conmmunityId");
    }
  }
};
</script>
