<template>
  <div class="page-index">
    <login-container />
  </div>
</template>

<script>
//#region Imports
import LoginContainer from "@/components/login-container";
//#endregion

export default {
  name: "page-index",
  components: {
    LoginContainer,
  },
};
</script>

<style scoped lang="scss">
.page-index {
}
</style>
