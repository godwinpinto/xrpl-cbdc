import './assets/main.css'

import { createApp} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
//import PusherPlugin from '@/utils/pusherConfig'

const app = createApp(App);
//app.use(PusherPlugin);
app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
