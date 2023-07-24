<template>
  <div class="content">

    <h1 class="heading">Looking for Buddies</h1>

    <div class="bg-white p-4">

      <div class="border-bottom py-3 px-2" v-for="(skill, index) in skills" :key="index" v-if="select_skill_ids.indexOf(skill.skill_id) >= 0">
        <label class="">
          <input type="checkbox" v-model="select_skill_ids" :value="skill.skill_id">
          {{skill.skill_name}}
        </label>
      </div>
      <div class="border-bottom py-3 px-2" v-for="(skill, index) in skills" :key="index" v-if="select_skill_ids.indexOf(skill.skill_id) < 0">
        <label class="">
          <input type="checkbox" v-model="select_skill_ids" :value="skill.skill_id">
          {{skill.skill_name}}
        </label>
      </div>

      <div class="text-center mt-5">
        <button class="btn btn-primary" @click="confirm">Confirm</button>
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
    sbt_id: -1,
    skills: [],
    select_skill_ids: [],
    isConfirmation: false,
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
      this.select_skill_ids = this.$store.state.looking_buddy_recommend_skills;

      let res;
      try {
        res = await this.apiGetJobCheck(this.job_id);
        this.skills = res.data?.skills || [];

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    confirm: async function() {
      let res;
      this.isConfirmation = true;
      try {
        res = await this.apiPostJobUpdate(this.job_id, this.select_skill_ids);
        if(res.data?.status) {
          this.$router.push("/looking/buddy/recommend/"+this.job_id);
        }
      } catch (error) {
        this.$log.error(error);
        this.isConfirmation = false;
        return;
      }
    },


  },
}
</script>
