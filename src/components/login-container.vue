<template>
  <div class="component-login-container">
    <h1 class="text-gray-700 text-xl font-bold">Login</h1>
    <form class="flex flex-col items-center" @submit.prevent="login">
      <div class="flex flex-col mt-4">
        <label
          class="block text-gray-700 text-left text-sm font-bold mb-2"
          for="username"
        >
          User Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="error ? 'border-red-500' : ''"
          type="text"
          v-model="username"
          placeholder="Enter Username"
          id="username"
        />
      </div>
      <div class="flex flex-col mt-4">
        <label
          class="block text-gray-700 text-left text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="error ? 'border-red-500' : ''"
          type="password"
          v-model="password"
          placeholder="Enter Password"
          id="password"
        />
      </div>
      <button class="btn-blue mt-4">Sign in</button>
    </form>
    <div class="text-red-600 mt-4">{{ error?.message }}</div>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
//#endregion

export default {
  name: "component-login-container",
  setup() {
    //#region useComposables
    const store = useStore();
    //#endregion

    //#region Reactive References
    const state = reactive({
      username: "",
      password: "",
      email: "",
      error: null,
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    async function login() {
      try {
        await store.dispatch("auth/login", {
          username: state.username,
          password: state.password,
        });
      } catch (error) {
        console.log(error);
        state.error = error;
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      login,
    };
  },
};
</script>

<style scoped lang="scss">
.component-login-container {
}
</style>
