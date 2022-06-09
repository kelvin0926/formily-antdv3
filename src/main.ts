import { createApp } from 'vue'
import App from './App.vue'
import Antdv from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import WidgetsInstaller from './formDesigner/designerPanel/widgets'

const app = createApp(App)
    .use(Antdv)
    .use(WidgetsInstaller)

app.mount('#app');
