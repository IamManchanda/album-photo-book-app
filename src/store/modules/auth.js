import { Auth } from "aws-amplify";

export const auth = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    logout: async ({ commit }, _payload) => {
      commit("setUser", null);
      return await Auth.signOut();
    },
    login: async ({ commit }, { username, password }) => {
      try {
        await Auth.signIn({
          username,
          password,
        });

        const userInfo = await Auth.currentUserInfo();
        commit("setUser", userInfo);
        return Promise.resolve("Success");
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    confirmSignup: async (_context, { username, code }) => {
      try {
        await Auth.confirmSignUp(username, code);
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    signup: async (_context, { username, password, email }) => {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
        });
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    authAction: async ({ commit }, _payload) => {
      const userInfo = await Auth.currentUserInfo();
      commit("setUser", userInfo);
    },
  },
  getters: {
    user: state => state.user,
  },
};
