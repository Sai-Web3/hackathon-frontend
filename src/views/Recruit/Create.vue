<template>
  <div class="content">

    <h1>Recruit</h1>

    <div class="form-group">
      <textarea class="form-control"></textarea>
    </div>

    <div class="form-group text-center">
      <div class="btn btn-primary" @click="recruit">Create</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MatchSearch',
  components: {
  },
  data: () => ({
    walletAddress: null,
    sbts: [],
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

    recruit: async function() {
    },

  },
}
</script>
