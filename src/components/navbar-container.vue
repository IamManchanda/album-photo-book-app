<template>
  <div class="component-navbar-container">
    <ul class="flex justify-end">
      <template v-if="authInitiated && !user">
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

      <template v-if="user">
        <li class="mr-6">
          <div class="font-semibold text-black-500">
            Welcome @{{ user.username }}
          </div>
        </li>
        <li class="mr-6">
          <router-link to="/albums">
            <a class="text-blue-500 hover:text-blue-800 cursor-pointer">
              Albums
            </a>
          </router-link>
        </li>
        <li class="mr-6">
          <div
            class="text-blue-500 hover:text-blue-800 cursor-pointer logout"
            @click="logout"
          >
            Logout
          </div>
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
  props: {
    authInitiated: {
      type: Boolean,
      default: false,
    },
  },
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
        await store.dispatch("albumInfo/resetAlbums");
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
  padding: 1.5rem;

  a,
  .logout {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
