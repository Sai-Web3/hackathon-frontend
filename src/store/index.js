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

    looking_job_recommends: [],
    looking_job_skills: {},
    looking_job_jobs: {},

    looking_buddy_recommend_skills: [],
    looking_buddy_recommends: [],
    looking_buddy_skills: {},
    looking_buddy_profiles: {},

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
    setLookingBuddyRecommendSkills(state, looking_buddy_recommend_skills) {
      state.looking_buddy_recommend_skills = looking_buddy_recommend_skills;
    },
    setLookingBuddyRecommends(state, looking_buddy_recommends) {
      state.looking_buddy_recommends = looking_buddy_recommends;
    },
    setLookingBuddySkills(state, looking_buddy_skills) {
      state.looking_buddy_skills = looking_buddy_skills;
    },
    setLookingBuddyProfiles(state, looking_buddy_profiles) {
      state.looking_buddy_profiles = looking_buddy_profiles;
    },
    setLookingJobRecommends(state, looking_job_recommends) {
      state.looking_job_recommends = looking_job_recommends;
    },
    setLookingJobSkills(state, looking_job_skills) {
      state.looking_job_skills = looking_job_skills;
    },
    setLookingJobJobs(state, looking_job_jobs) {
      state.looking_job_jobs = looking_job_jobs;
    },
  },
  actions: {
  },
  modules: {},
  plugins,
});

