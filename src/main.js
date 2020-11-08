import { createApp } from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles/scss/tailwind.scss";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
