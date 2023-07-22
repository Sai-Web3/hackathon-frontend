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
        <div class="col-4">
          <div>サンプルネーム</div>
          <div>50%</div>
          <div>
            <ul>
              <li>Research Skills</li>
              <li>Analytical Skills</li>
              <li>Sort Algorithms</li>
            </ul>
          </div>
          <div class="row">
            <div class="col-6">
              <router-link to="/sbt/detail/1" class="btn btn-primary">SBT詳細</router-link>
            </div>
            <div class="col-6">
              <input type="checkbox" value="1" v-model="select_sbt_ids" style="margin: 5px 0 0;;">
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
      this.recommends = this.$store.state.recommends;
    },

    offer: async function() {
      this.$store.commit("setLookingSbtIds", this.select_sbt_ids);
      this.$router.push("/looking/buddy/offer/"+this.job_id);
    },


  },
}
</script>
