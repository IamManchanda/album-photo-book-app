import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { albumInfo } from "./modules/albums";

export default createStore({
  modules: {
    auth,
    albumInfo,
  },
});
