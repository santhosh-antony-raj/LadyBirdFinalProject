import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import BaseSpinner from './ui/BaseSpinner.vue';

const app = createApp(App);

app.component('base-spinner', BaseSpinner);
app.use(store);
app.use(router);
app.mount('#app');
