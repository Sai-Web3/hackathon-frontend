 <template>
  <div class="content">

    <h1 class="heading">Looking for Jobs</h1>

    <div class="bg-white p-4">

      <div class="row">
        <div class="col-4" v-for="(job, index) in jobs" :key="index">
          <div>{{job.title}}</div>
          <div>50%</div>
          <div>
            <ul>
              <li>Research Skills</li>
              <li>Analytical Skills</li>
              <li>Sort Algorithms</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-6 text-center">
          <div class="btn btn-secondary" @click="$router.go(-1)">Cancel</div>
        </div>
        <div class="col-6 text-center">
          <div class="btn btn-primary" @click="confirm">Confirm</div>
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
    sbt_id: -1,
    looking_job_ids: [],
    jobs: [],
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
      this.looking_job_ids = this.$store.state.looking_job_ids;

      let res;
      try {
        res = await this.apiPostJob(this.looking_job_ids);
        this.jobs = res.data?.jobs || [];
      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    confirm: async function() {
      let res;
      this.isConfirmation = true;
      try {
        res = await this.apiPostJobApplication(this.$store.state.sbt_id, this.looking_job_ids);
        if(res.data?.status) {
          this.$router.push("/sbt/detail/"+this.$store.state.sbt_id);
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
