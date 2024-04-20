import { createApp } from "vue";
import { createPinia } from "pinia";
import VueLazyLoad from "vue3-lazyload";

import router from "./router";
import "./assets/style/mixins.scss";
import "./assets/style/index.scss";
import App from "./App.vue";
const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VueLazyLoad);
app.mount("#app");
