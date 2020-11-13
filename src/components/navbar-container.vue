<template>
  <div class="component-navbar-container">
    <ul class="flex justify-end">
      <template v-if="user">
        <li class="mr-6">
          <div class="font-semibold text-black-500">
            Welcome {{ user.username }}
          </div>
        </li>
        <li class="mr-6">
          <router-link to="/albums">
            <div class="text-blue-500 hover:text-blue-800 cursor-pointer">
              Albums
            </div>
          </router-link>
        </li>
        <li class="mr-6">
          <div
            class="text-blue-500 hover:text-blue-800 cursor-pointer"
            @click="logout"
          >
            Logout
          </div>
        </li>
      </template>

      <template v-else>
        <li class="mr-6">
          <router-link to="/">
            <a class="text-blue-500 hover:text-blue-800 cursor-pointer">
              Login
            </a>
          </router-link>
        </li>
        <li class="mr-6">
          <router-link to="/signup">
            <a class="text-blue-500 hover:text-blue-800 cursor-pointer">
              Sign Up
            </a>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//#endregion

export default {
  name: "component-navbar-container",
  setup() {
    //#region useComposables
    const store = useStore();
    const router = useRouter();
    //#endregion

    //#region Reactive References
    const state = reactive({
      user: computed(() => store.getters["auth/user"]),
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    async function logout() {
      try {
        await store.dispatch("auth/logout");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      logout,
    };
  },
};
</script>

<style scoped lang="scss">
.component-navbar-container {
}
</style>
