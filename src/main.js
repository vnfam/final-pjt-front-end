import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { createPinia } from 'pinia';

library.add(fas);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
