 <template>
  <div class="content">

    <h1 class="heading">Looking for Jobs</h1>

    <div class="bg-white p-4">

      <div class="row">
        <div class="col-4" v-for="(recommend, index) in recommends" :key="index">
          <div class="border p-3 my-3">
            <div>{{jobs[recommend.job_id] ?? "Undefined"}}</div>
            <div class="text-center h1 my-3">{{recommend.point.toFixed(0)}}%</div>
            <div>
              <ul>
                <li v-for="skill_id in recommend.skill_ids" :key="skill_id">{{skills[skill_id] ?? "Undefined"}}</li>
              </ul>
            </div>
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
    recommends: [],
    skills: {},
    jobs: {},
    looking_job_ids: [],
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
      this.recommends = this.$store.state.looking_job_recommends;
      this.skills = this.$store.state.looking_job_skills;
      this.jobs = this.$store.state.looking_job_jobs;
      this.looking_job_ids = this.$store.state.looking_job_ids;
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
