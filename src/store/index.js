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
    sbt_id: -1,
    skills: [],

    looking_job_ids: [],
    looking_sbt_ids: [],
    looking_recommends: [],

  },
  getters: {
  },
  mutations: {
    setWalletAddress(state, walletAddress) {
      state.walletAddress = walletAddress;
    },
    setSbtId(state, sbt_id) {
      state.sbt_id = sbt_id;
    },
    setSkills(state, skills) {
      state.skills = skills;
    },
    setLookingJobIds(state, looking_job_ids) {
      state.looking_job_ids = looking_job_ids;
    },
    setLookingSbtIds(state, looking_sbt_ids) {
      state.looking_sbt_ids = looking_sbt_ids;
    },
    setLookingRecommends(state, looking_recommends) {
      state.looking_recommends = looking_recommends;
    },
  },
  actions: {
  },
  modules: {},
  plugins,
});

