import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// createApp(App).use(BootstrapVue3)‏.mount('#app')
const app = createApp(App)
app.use(BootstrapVue3)
app.mount('#app')