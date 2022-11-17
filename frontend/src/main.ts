import { Component, createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './plugins/vue-router';
import store from './plugins/vuex';
import plugins from './plugins';
import forEach from 'lodash/forEach';
import { getGlobalComponents } from './common/loadGlobalComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/global.scss';
const app = createApp(App)
    .use(store)
    .use(router)
    .use(plugins.i18n)
    .use(plugins.ElementUI, {
        i18n: (key: string) => {
            return plugins.i18n.global.t(key);
        },
    });
// load all components under the folder @/components as glolal components
forEach(getGlobalComponents(), (component, name) => {
    app.component(name, component as Component);
});

router.isReady().then(() => {
    app.mount('#app');
});
