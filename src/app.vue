<template>
  <navbar-container :authInitiated="authInitiated" />
  <router-view />
</template>

<script>
//#region Imports
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import NavbarContainer from "@/components/navbar-container";
//#endregion

export default {
  name: "app",
  components: {
    NavbarContainer,
  },
  setup() {
    //#region useComposables
    const store = useStore();
    //#endregion

    //#region Reactive References
    const state = reactive({
      authInitiated: false,
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    onMounted(() => {
      initAuth();
    });
    //#endregion

    //#region Methods
    async function initAuth() {
      try {
        await store.dispatch("auth/authAction");
        state.authInitiated = true;
      } catch (error) {
        state.authInitiated = false;
        console.log(error);
      }
    }
    //#endregion

    return {
      ...toRefs(state),
    };
  },
};
</script>
