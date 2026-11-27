import { createApp } from 'vue'
import App from './App.vue'
import router from './rutas/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './estilos/estilos.css'

createApp(App).use(router).mount('#app')
