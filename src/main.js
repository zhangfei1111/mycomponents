import {
    createApp
} from 'vue'
import './style.css'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
// 引入路由实例
import router from './router/index.js'
createApp(App).use(router).mount('#app')