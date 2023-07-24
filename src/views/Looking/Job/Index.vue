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
        <div class="col-4" v-for="(recommend, index) in recommends" :key="index">
          <div class="border p-3 my-3">
            <div>{{jobs[recommend.job_id] ?? "Undefined"}}</div>
            <div class="text-center h1 my-3">{{recommend.point.toFixed(0)}}%</div>
            <div>
              <ul>
                <li v-for="skill_id in recommend.skill_ids" :key="skill_id">{{skills[skill_id] ?? "Undefined"}}</li>
              </ul>
            </div>
            <div class="row">
              <div class="col-6">
                <router-link :to="`/looking/job/detail/${recommend.job_id}`" class="btn btn-primary">Detail</router-link>
              </div>
              <div class="col-6 text-end">
                <input type="checkbox" :value="recommend.job_id" v-model="select_job_ids" style="margin: 8px 0 0;;">
              </div>
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
    recommends: [],
    skills: {},
    jobs: {},
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

      let res;
      try {
        res = await this.apiGetJob(this.$store.state.sbt_id);
        this.jobs = res.data?.jobs || [];
        this.recommends = res.data?.recommends || [];
        this.skills = res.data?.skills || {};
        this.jobs = res.data?.jobs || {};
        this.$store.commit("setLookingJobSkills", this.skills);
        this.$store.commit("setLookingJobJobs", this.jobs);

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    offer: async function() {

      let recommends = [];

      for(let i in this.select_job_ids) {
        for(let j in this.recommends) {
          if(this.select_job_ids[i] == this.recommends[j].job_id) {
            recommends.push(this.recommends[j]);
          }
        }
      }

      this.$store.commit("setLookingJobRecommends", recommends);
      this.$store.commit("setLookingJobIds", this.select_job_ids);
      this.$router.push("/looking/job/offer");
    },

  },
}
</script>
