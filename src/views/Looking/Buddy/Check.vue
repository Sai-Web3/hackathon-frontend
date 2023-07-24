<template>
  <div class="content">

    <h1 class="heading">Looking for Buddies</h1>

    <div class="bg-white p-4":class="{ 'hide': isConfirmation }">

      <div class="border-bottom py-3 px-2" v-for="(skill, index) in skills" :key="index" v-if="select_skill_ids.indexOf(skill.skill_id) >= 0">
        <label class="">
          <input type="checkbox" v-model="select_skill_ids" :value="skill.skill_id">
          {{skill.skill_name}}
        </label>
      </div>
      <div class="border-bottom py-3 px-2" v-for="(skill, index) in skills" :key="index" v-if="select_skill_ids.indexOf(skill.skill_id) < 0">
        <label class="">
          <input type="checkbox" v-model="select_skill_ids" :value="skill.skill_id">
          {{skill.skill_name}}
        </label>
      </div>

      <div class="text-center mt-5">
        <button class="btn btn-primary" @click="confirm">Confirm</button>
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
  name: 'LookingBuddyCheck',
  components: {
  },
  data: () => ({
    walletAddress: null,
    sbt_id: -1,
    skills: [],
    select_skill_ids: [],
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
      this.job_id = this.$route.params.job_id;
      this.select_skill_ids = this.$store.state.looking_buddy_recommend_skills;

      try {
        const res = await this.apiGetJobCheck(this.job_id);
        this.skills = res.data?.skills || [];
      } catch (error) {
        this.$log.error(error);
      }
    },

    async confirm() {
      this.isConfirmation = true;
      try {
        const res = await this.apiPostJobUpdate(this.job_id, this.select_skill_ids);
        if(res.data?.status) {
          this.$router.push("/looking/buddy/recommend/"+this.job_id);
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
