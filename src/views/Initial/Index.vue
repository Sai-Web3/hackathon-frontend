<template>
  <div class="content">

    <div class="initial_box">
      <div class="heading">You're connected!</div>
      <div class="description">welcome to the new era</div>
       <div class="line"></div>
      <div class="button_box">
        <router-link to="/initial/ai" class="ai_button">Let’s Create Your SBT</router-link>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Initial',
  components: {
  },
  data: () => ({
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
  },
  methods: {

    getAccount: async function() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },

  },
}
</script>
