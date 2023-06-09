import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "vue-js-modal/dist/styles.css";
import CryptoJS from 'crypto-js'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

Vue.use(CryptoJS);
Vue.use(VueMoment, { moment })
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

