import { createStore } from "vuex";
import { auth } from "./auth/auth";

export default createStore({
  modules: { auth },
});
