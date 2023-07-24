<template>
  <div class="content">

    <h1 class="heading">Looking for Jobs</h1>

    <div class="bg-white p-4">

      <div class="" @click="$router.go(-1)" style="cursor: pointer;"><i class="fa-solid fa-arrow-left"></i></div>

      <div class="form-group">
        <strong>Title</strong>
        <div class="">{{job.title ?? ""}}</div>
      </div>

      <div class="form-group">
        <strong>Job Description</strong>
        <div class="">{{job.input_text ?? ""}}</div>
      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LookingJobDetail',
  components: {
  },
  data: () => ({
    walletAddress: null,
    job_id: -1,
    job: {},
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

      let res;
      try {
        res = await this.apiGetJobDetail(this.job_id);
        this.job = res.data?.job || {};

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

  },
}
</script>
