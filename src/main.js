import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as fb from './firebaseConfig';
import './assets/app.scss';

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({store, router, render: (h) => h(App)}).$mount('#app');
  }
});
