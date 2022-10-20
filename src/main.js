import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import i18n from "./i18n"
import "./assets/tailwind.css"
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"
createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(autoAnimatePlugin)
  .mount("#app")
