import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import '@fortawesome/fontawesome-free/css/all.css'
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
    theme : {
        themes: {
            light: {
                background: '#CECECE',
                primary: '#E53935',
                secondary: '#EF9A9A',
                accent: '#FF1744',
                error: '#C62828',
                info: '#2196F3',
                success: '#2E7D32',
                warning: '#EF6C00',
                
            },
        }
    }
});
