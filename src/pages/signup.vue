<template>
  <div class="page-signup">
    <signup-container />
  </div>
</template>

<script>
//#region Imports
import SignupContainer from "@/components/signup-container";
//#endregion

export default {
  name: "page-signup",
  components: {
    SignupContainer,
  },
};
</script>

<style scoped lang="scss">
.page-signup {
}
</style>
