<template>
  <div class="content">

    <div class="my-4">
      <router-link to="/recruit/create" class="btn btn-primary">Create</router-link>
    </div>

    <ul>
      <li v-for="recruit in recruits" :key="recruit.recruit_id"><router-link :to="`/recruit/detail/${recruit.recruit_id}`">Recruit ID: {{ recruit.recruit_id }}</router-link></li>
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
    recruits: [],
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
        // res = await this.apiGetRecruits();
        // this.recruits = res.data?.data || [];
      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

  },
}
</script>
