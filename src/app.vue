<template>
  <navbar-container />
  <router-view />
</template>

<script>
//#region Imports
import NavbarContainer from "@/components/navbar-container";
//#endregion

export default {
  name: "app",
  components: {
    NavbarContainer,
  },
};
</script>
