import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 載入 Element Plus 樣式
import 'element-plus/dist/index.css'
// 載入 Google Drive 服務，確保它在應用程式開始時就可用
import './services/googleDriveService'

// 過濾 ResizeObserver 錯誤（常見於手機瀏覽時）
// 攔截 console.error 來過濾 ResizeObserver 錯誤
const originalConsoleError = console.error
console.error = function(...args) {
  // 檢查錯誤訊息是否包含 ResizeObserver
  const errorMessage = args[0]?.toString() || ''
  if (errorMessage.includes('ResizeObserver loop')) {
    // 忽略這個錯誤，不顯示在 console
    return
  }
  // 其他錯誤正常顯示
  originalConsoleError.apply(console, args)
}

// 同時攔截 window.onerror
const originalErrorHandler = window.onerror
window.onerror = function(message, source, lineno, colno, error) {
  if (typeof message === 'string' && message.includes('ResizeObserver loop')) {
    return true // 阻止錯誤顯示
  }
  if (originalErrorHandler) {
    return originalErrorHandler(message, source, lineno, colno, error)
  }
  return false
}

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
