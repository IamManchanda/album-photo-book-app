<template>
  <div class="page-index">
    <login-container />
  </div>
</template>

<script>
import LoginContainer from "@/components/login-container";

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
