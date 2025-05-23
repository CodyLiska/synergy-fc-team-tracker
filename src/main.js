import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "./style.css";
import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
