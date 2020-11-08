// https://github.com/aws-amplify/amplify-js/issues/6756#issuecomment-710100373

import { createApp } from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles/scss/tailwind.scss";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";
/* import "@aws-amplify/ui-vue"; */

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Amplify.configure(awsExports);

const app = createApp(App);
app.config.isCustomElement = tag => tag.startsWith("amplify-");

app
  .use(store)
  .use(router)
  .mount("#app");
