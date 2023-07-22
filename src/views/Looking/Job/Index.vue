<template>
  <div class="content">

    <h1 class="heading">Looking for Jobs</h1>

    <div class="bg-white p-4">

      <div class="row">
        <div class="col-6">
          <div class="" @click="$router.go(-1)" style="cursor: pointer;"><i class="fa-solid fa-arrow-left"></i></div>
        </div>
        <div class="col-6">
          <div class="text-end mb-4">
            <div class="btn btn-primary" @click="offer">Offer</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4" v-for="(job, index) in jobs" :key="index">
          <div>{{job.title}}</div>
          <div>50%</div>
          <div>
            <ul>
              <li>Research Skills</li>
              <li>Analytical Skills</li>
              <li>Sort Algorithms</li>
            </ul>
          </div>
          <div class="row">
            <div class="col-6">
              <router-link :to="`/looking/job/detail/${job.id}`" class="btn btn-primary">仕事詳細</router-link>
            </div>
            <div class="col-6">
              <input type="checkbox" :value="job.id" v-model="select_job_ids" style="margin: 5px 0 0;;">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LookingJob',
  components: {
  },
  data: () => ({
    walletAddress: null,
    jobs: [],
    select_job_ids: [],
  }),
  computed: {
  },
  async mounted() {
    if (window.ethereum) {
      this.walletAddress = await this.getAccount()
      if(this.walletAddress != this.$store.state.walletAddress) {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
    await this.initialize();
  },
  methods: {
    getAccount: async function() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },

    initialize: async function() {

      this.$store.commit("setLookingJobIds", []);

      let res;
      try {
        res = await this.apiGetJob();
        this.jobs = res.data?.jobs || [];

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    offer: async function() {
      this.$store.commit("setLookingJobIds", this.select_job_ids);
      this.$router.push("/looking/job/offer");
    },

  },
}
</script>
