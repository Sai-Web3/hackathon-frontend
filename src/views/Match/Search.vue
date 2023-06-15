<template>
  <div class="content">

    <h1>Search Match</h1>

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

    initialize: async function() {
    },

  },
}
</script>
