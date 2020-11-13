<template>
  <div class="component-signup-container">
    <template v-if="confirmPassword">
      <div class="w-4/12 m-auto">
        <h2 class="text-gray-700 text-md font-bold">
          Enter your code. Please check your email
        </h2>
        <div class="flex flex-col mt-4">
          <label
            class="block text-gray-700 text-left text-sm font-bold"
            for="code"
          >
            Code
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="error ? 'border-red-500' : ''"
            type="text"
            v-model="code"
            placeholder="Enter Code"
            id="code"
          />
          <button class="btn-blue mt-4" @click="confirmSignup">
            Confirm Code
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <h1 class="text-gray-700 text-xl font-bold">Signup</h1>
      <form class="flex flex-col items-center" @submit.prevent="signup">
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
        <div class="flex flex-col mt-4">
          <label
            class="block text-gray-700 text-left text-sm font-bold"
            for="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="error ? 'border-red-500' : ''"
            type="email"
            v-model="email"
            placeholder="Enter Email"
            id="email"
          />
        </div>
        <button class="btn-blue mt-4">Sign Up</button>
      </form>
    </template>

    <div v-if="error" class="text-red-600 mt-4">{{ error?.message }}</div>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//#endregion

export default {
  name: "component-signup-container",
  setup() {
    //#region useComposables
    const store = useStore();
    const router = useRouter();
    //#endregion

    //#region Reactive References
    const state = reactive({
      username: "",
      password: "",
      email: "",
      confirmPassword: false,
      code: "",
      error: null,
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    async function signup() {
      if (!state.email || !state.password) return;
      try {
        await store.dispatch("auth/signup", {
          username: state.username,
          password: state.password,
          email: state.email,
        });

        state.confirmPassword = true;
      } catch (error) {
        console.log(error);
        state.error = error;
      }
    }

    async function confirmSignup() {
      if (!state.username || !state.code) return;
      try {
        await store.dispatch("auth/confirmSignup", {
          username: state.username,
          code: state.code,
        });

        await store.dispatch("auth/login", {
          username: state.username,
          password: state.password,
        });

        router.push("/albums");
      } catch (error) {
        console.log(error);
        state.error = error;
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      signup,
      confirmSignup,
    };
  },
};
</script>

<style scoped lang="scss">
.component-signup-container {
}
</style>
