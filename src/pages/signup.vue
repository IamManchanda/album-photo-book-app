<template>
  <div class="page-signup">
    <signup-container />
  </div>
</template>

<script>
import SignupContainer from "@/components/signup-container";

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
