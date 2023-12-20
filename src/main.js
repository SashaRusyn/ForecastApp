import { createApp } from 'vue';
import store from '@/store';
import App from '@/App.vue';
import VFocus from './directives/VFocus';

const app = createApp(App);

app.directive('focus', VFocus);

app.use(store).mount('#app')
