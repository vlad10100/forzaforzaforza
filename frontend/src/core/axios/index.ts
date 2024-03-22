import axios from 'axios'
import type { App } from 'vue'

const baseUrl = import.meta.env.VITE_APP_ENV === 'DEVELOPMENT' ? 'http://localhost:3000/' : ''

const axiosWithErrorInterceptor = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
})

// axiosWithErrorInterceptor.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status !== 401) return

// TODO
// clear authenticated user and cookie
// logout user to the backend
//   },
// )

export default {
  install: (app: App) => {
    app.provide('axios', axiosWithErrorInterceptor)
  },
}
