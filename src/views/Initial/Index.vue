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
export default {
  name: 'Initial',
  async mounted() {
    if (window.ethereum) {
      this.walletAddress = await this.$store.dispatch('getAccount');
      if(this.walletAddress != this.$store.state.walletAddress) {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  },
  methods: {
  },
}
</script>
