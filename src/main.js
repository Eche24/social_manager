import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import db from "./db";
import VueSimpleAlert from "vue-simple-alert";
console.log(db);

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
