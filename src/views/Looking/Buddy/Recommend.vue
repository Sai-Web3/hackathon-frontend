<template>
  <div class="content">

    <h1 class="heading">Recommendations</h1>

    <div class="bg-white p-4">

      <div class="row">
        <div class="col-6">
        </div>
        <div class="col-6">
          <div class="text-end mb-4">
            <div class="btn btn-primary" @click="offer">Offer</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4" v-for="(recommend, index) in recommends" :key="index" v-if="recommend.point > 0">
          <div class="border p-3 my-3">
            <div>{{profiles[recommend.sbt_id] ?? "Undefined"}}</div>
            <div class="text-center h1 my-3">{{recommend.point.toFixed(0)}}%</div>
            <div>
              <ul >
                <li v-for="skill_id in recommend.skill_ids" :key="skill_id">{{skills[skill_id] ?? "Undefined"}}</li>
              </ul>
            </div>
            <div class="row">
              <div class="col-6">
                <router-link :to="`/looking/job/detail/${recommend.sbt_id}`" class="btn btn-primary">Detail</router-link>
              </div>
              <div class="col-6 text-end">
                <input type="checkbox" :value="recommend.sbt_id" v-model="select_sbt_ids" style="margin: 5px 0 0;;">
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
  name: 'SbtDetail',
  components: {
  },
  data: () => ({
    walletAddress: null,
    job_id: -1,
    recommends: [],
    skills: {},
    profiles: {},
    select_sbt_ids: [],
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

      this.job_id = this.$route.params.job_id;

      let res;
      try {
        res = await this.apiGetJobRecommend(this.job_id);
        this.recommends = res.data?.recommends || [];
        this.skills = res.data?.skills || {};
        this.profiles = res.data?.profiles || {};
        this.$store.commit("setLookingBuddySkills", this.skills);
        this.$store.commit("setLookingBuddyProfiles", this.profiles);

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    offer: async function() {

      let recommends = [];

      for(let i in this.select_sbt_ids) {
        for(let j in this.recommends) {
          if(this.select_sbt_ids[i] == this.recommends[j].sbt_id) {
            recommends.push(this.recommends[j]);
          }
        }
      }

      this.$store.commit("setLookingBuddyRecommends", recommends);
      this.$store.commit("setLookingSbtIds", this.select_sbt_ids);
      this.$router.push("/looking/buddy/offer/"+this.job_id);
    },


  },
}
</script>
