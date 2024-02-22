import "./assets/main.css";

import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config";
import App from "./App.vue";
import router from "./router";

import ToastPlugin from "vue-toast-notification";

import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.use(router);
app.use(plugin, defaultConfig(config));
app.use(ToastPlugin);

app.mount("#app");
