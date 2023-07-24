<template>
  <div class="content">

    <h1 class="heading">Looking for Buddies</h1>

    <div class="bg-white p-4">

      <div class="form-group">
        <label>Title</label>
        <input type="text" name="" class="form-control" v-model="title">
      </div>

      <div class="form-group">
        <label>Describe your idea / project as much detailed as you can.</label>
        <textarea class="form-control" rows="5" v-model="input_text"></textarea>
      </div>

      <div class="text-center">
        <button class="btn btn-primary" @click="generate">Generate</button>
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
    title: "",
    input_text: "",
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
      this.sbt_id = this.$route.params.sbt_id;
    },

    generate: async function() {
      let res;
      this.isConfirmation = true;
      try {
        res = await this.apiPostJobCreate(this.$store.state.sbt_id, this.title, this.input_text);
        if(res.data?.status) {
          this.$store.commit("setLookingBuddyRecommendSkills", res.data?.recommend_skills);
          this.$router.push("/looking/buddy/check/"+res.data.job_id);
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
