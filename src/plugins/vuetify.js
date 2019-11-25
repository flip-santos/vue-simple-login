import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    themes: {
      light: {
        primary: '#6F488E',
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        error: '#eb6060',
      },
    },
  },
});
