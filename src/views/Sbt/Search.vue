<template>
  <div class="content">

    <ul>
      <li v-for="sbt in sbts" :key="sbt.sbt_id"><router-link :to="`/sbt/detail/${sbt.sbt_id}`">SBT ID: {{ sbt.sbt_id }}</router-link></li>
    </ul>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Mypage',
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
      let res;
      try {
        res = await this.apiPostSbtSearch("");
        this.sbts = res.data?.data || "";
      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

  },
}
</script>
