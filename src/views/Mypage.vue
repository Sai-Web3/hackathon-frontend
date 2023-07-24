<template>
  <div class="content">
    <div class="mypage_box">
      <h1 class="heading">This is Your Skill Element!</h1>

      <div class="text-center">
        <img src="@/assets/sbt.gif">
      </div>

      <div class="row mt-5">
        <div class="col-3">&nbsp;</div>
        <div class="col-3 px-4">
          <router-link to="/" class="cancel_button">Cancel</router-link>
        </div>
        <div class="col-3 px-4">
          <router-link :to="{ path: `/sbt/detail/${sbt_id}`}" class="check_button">Check Detail</router-link>        
        </div>
        <div class="col-3"></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Mypage',
  data() {
    return {
      walletAddress: null,
      sbt_id: -1,
      skills: [],
    };
  },
  async mounted() {
    try {
      if (window.ethereum) {
        this.walletAddress = await this.getAccount()
        if(this.walletAddress !== this.$store.state.walletAddress) {
          this.redirectToHomePage();
        }
      } else {
        this.redirectToHomePage();
      }
      await this.initialize();
    } catch (error) {
      this.$log.error(error);
    }
  },
  methods: {
    getAccount: async function() {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      return accounts[0];
    },
    redirectToHomePage() {
      this.$router.push("/");
    },
    initialize: async function() {
      const { data } = await this.apiGetSbtAccount(this.walletAddress);
      this.sbt_id = data?.sbt_id;
      this.skills = data?.data || "";
      if(this.sbt_id === -1) {
        this.$router.push("/initial");
      }
    },
  },
}
</script>
