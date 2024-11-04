import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // Optional: Import global styles

createApp(App)
    .use(router)
    .mount('#app');
