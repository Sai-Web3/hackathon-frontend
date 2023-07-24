<template>
  <div class="content">

    <h1 class="heading">Looking for Buddies</h1>

    <div class="bg-white p-4" :class="{ 'hide': isConfirmation }">

      <div class="row">
        <div class="col-6">
          <div class="" @click="$router.go(-1)" style="cursor: pointer;"><i class="fa-solid fa-arrow-left"></i></div>
        </div>
      </div>

      <div class="form-group">
        <label>Title</label>
        <input type="text" name="" class="form-control" v-model="title">
      </div>

      <div class="form-group">
        <label>Describe your idea / project as much detailed as you can.</label>
        <textarea class="form-control" rows="5" v-model="input_text"></textarea>
      </div>

      <div class="text-center">
        <button class="btn btn-primary" @click="generate">Generate</button>
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
  name: 'LookingBuddyCreate',
  components: {
  },
  data: () => ({
    walletAddress: null,
    sbt_id: -1,
    title: "",
    input_text: "",
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
    async initialize() {
      this.sbt_id = this.$route.params.sbt_id;
    },
    async generate() {
      this.formSubmitted = true;
      if(!this.title || !this.input_text) return;
      this.isConfirmation = true;
      try {
        const res = await this.apiPostJobCreate(this.$store.state.sbt_id, this.title, this.input_text);
        if(res.data?.status) {
          this.$store.commit("setLookingBuddyRecommendSkills", res.data?.recommend_skills);
          this.$router.push("/looking/buddy/check/"+res.data.job_id);
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
