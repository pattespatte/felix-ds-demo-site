import { createApp } from 'vue'
import '@fkui/icon-lib-default/dist/f'
import '@fkui/design/lib/fkui.css'
import '@fkui/design/lib/fonts.css'
import './assets/main.scss'
import './fkui-patches'
import App from './App.vue'
import router from './router'
import { ValidationPlugin } from '@fkui/vue'
import { restoreColorMode } from './color-mode'
import { installPageTitleSync } from './composables/usePageTitle'

// Restores the persisted color-mode choice (or the system preference) before
// the app mounts; the inline script in index.html already applied the
// attribute pre-paint, this keeps the module state in sync.
restoreColorMode()

const app = createApp(App)
app.use(router)
installPageTitleSync(router)
app.use(ValidationPlugin)
app.mount('#app')
