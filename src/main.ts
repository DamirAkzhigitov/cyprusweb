import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports.js";

Amplify.configure(awsExports);

createApp(App).use(store).use(router).mount("#app");
