 <template>
  <div class="content">

    <h1 class="heading">Looking for Buddies</h1>

    <div class="bg-white p-4" :class="{ 'hide': isConfirmation }">

      <div class="row">
        <div class="col-4" v-for="(recommend, index) in recommends" :key="index" v-if="recommend.point > 0">
          <div class="border p-3 my-3">
            <div>{{profiles[recommend.sbt_id] ?? "Undefined"}}</div>
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

    <div class="loading_box" :class="{ 'hide': !isConfirmation }">
      <div ref="loading_image" class="image"></div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import lottie from 'lottie-web';

export default {
  name: 'LookingBuddyOffer',
  components: {
  },
  data: () => ({
    walletAddress: null,
    job_id: -1,
    recommends: [],
    skills: {},
    profiles: {},
    looking_sbt_ids: [],
    isConfirmation: false,
  }),
  computed: {
  },
  async mounted() {
    if (window.ethereum) {
      this.walletAddress = await this.$store.dispatch('getAccount');
      if(this.walletAddress != this.$store.state.walletAddress) {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
    await this.initialize();
    this.loadAnimation();
  },
  methods: {
    initialize: async function() {
      this.job_id = this.$route.params.job_id;
      this.recommends = this.$store.state.looking_buddy_recommends;
      this.skills = this.$store.state.looking_buddy_skills;
      this.profiles = this.$store.state.looking_buddy_profiles;
      this.looking_sbt_ids = this.$store.state.looking_sbt_ids;
    },

    confirm: async function() {
      this.isConfirmation = true;
      try {
        const res = await this.apiPostJobOffer(this.job_id, this.looking_sbt_ids);
        if(res.data?.status) {
          this.$router.push("/sbt/detail/"+this.$store.state.sbt_id);
        }
        this.isConfirmation = false;
      } catch (error) {
        this.$log.error(error);
        this.isConfirmation = false;
      }
    },

    loadAnimation() {
      const loadingImageData = require('@/assets/json/loading.json');
      lottie.loadAnimation({
        container: this.$refs.loading_image,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingImageData,
      });
    },


  },
}
</script>
