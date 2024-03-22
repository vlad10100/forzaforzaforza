import '@/assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from '@/App.vue'

import router from '@/router'
import axios from '@/core/axios'

const app = createApp(App)

const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID

app.use(axios)

app.use(vue3GoogleLogin, { clientId: CLIENT_ID })
app.use(createPinia())
app.use(router)

app.mount('#app')
