import Vue from 'vue';
import axios from 'axios';

export default Vue.mixin({
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      waitingResponse: false,
      baseUrl: "http://20.222.137.190:3000",
    };
  },
  computed: {
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    sleep(msec = 1000) {
      return new Promise((resolve) => setTimeout(resolve, msec));
    },
    async apiRequest(method, path, params = {}) {
      method = method.toLowerCase();
      const url = `${this.baseUrl}/${path}`;
      const headers = {};
      let config = { method, url, headers };
      if (Object.keys(params).length > 0) {
        if (method === 'get') {
          config.params = params;
        } else {
          config.data = params;
        }
      }
      return await this.apiRequestWithRetry(method, config);
    },
    async apiRequestWithRetry(method, config, maxRetry = 5) {
      for (let i = 0; i < maxRetry; i++) {
        try {
          if (method !== 'get' && method !== 'options') {
            this.waitingResponse = true;
          }
          const res = await axios.request(config);
          if (method !== 'get' && method !== 'options') {
            this.waitingResponse = false;
          }
          return res;
        } catch (error) {
          if (error?.message?.toLowerCase() === 'network error' && i < maxRetry - 1) {
            await this.sleep(250);
            continue;
          }
          if (method !== 'get' && method !== 'options') {
            this.waitingResponse = false;
          }
          if (error.response?.data?.message) {
            console.info(error.response?.data?.message)
            await this.alert(error.response.data.message, 'API Error');
          } else if (error.message) {
            console.info(error.message)
            await this.alert(error.message, 'API Error');
          }
          throw error;
        }
      }
    },
    async apiGet(path, params = {}, useCache = false) {
      return await this.apiRequest('get', path, params, useCache);
    },
    async apiPost(path, params = {}) {
      return await this.apiRequest('post', path, params);
    },


    // initial
    async apiPostAiAnalysis(career, to) {
      const path = `ai/analysis`;
      return await this.apiPost(path, {career: career, to: to});
    },
    async apiPostMintParameter(address) {
      const path = `sbt/mint_parameter`;
      return await this.apiPost(path, {address: address});
    },

    // get
    async apiGetSbtAccount(address) {
      const path = `sbt/account/`+address;
      return await this.apiGet(path);
    },
    async apiGetSbtDetail(sbt_id) {
      const path = `sbt/detail/`+sbt_id;
      return await this.apiGet(path);
    },

    // post
    async apiPostSbtSearch(skill_name) {
      const path = `sbt/search`;
      return await this.apiPost(path, {skill_name: skill_name});
    },

    // common
    async apiPostEthereumParameter(from, to, calldata) {
      const path = `ethereum/parameter`;
      return await this.apiPost(path, {from: from, to: to, calldata: calldata});
    },

  },
});
