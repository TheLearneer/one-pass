import { createApp } from 'vue'
import App from './App.vue'
import { authenticator } from 'otplib'

import './assets/tailwind.css'

import router from './plugins/router'

const app = createApp(App);
app.use(router)
app.mount('#app')

declare global {
    interface Window {
        OnePass: any,
        otplib: {
            authenticator: typeof authenticator
        }
    }
}