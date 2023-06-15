/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {

    // dev
    sbtAddress: "0xe0994ce156a4d018cBA6651667B4C684AD571B55",
    // product
    // sbtAddress: "0x917Fa6f9aB7435685AD2b3E80eCD83A01ad35239",

    walletAddress: '',
    skills: [],

  },
  getters: {
  },
  mutations: {
    setWalletAddress(state, walletAddress) {
      state.walletAddress = walletAddress;
    },
    setSkills(state, skills) {
      state.skills = skills;
    },
  },
  actions: {
  },
  modules: {},
  plugins,
});

