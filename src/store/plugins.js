import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';

const plugins = [
  createPersistedState({
    key: 'sai',
  }),
];
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) {
  plugins.push(createLogger());
}
export default plugins;
