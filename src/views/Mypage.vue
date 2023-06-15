<template>
  <div class="content">

    <h1>This is Your Skill Element</h1>

    <div class="form-group">Your SBT ID: {{ sbt_id == -1 ? '': sbt_id }}</div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in skills" :key="skill.skill_name">
            <td>{{ skill.skill_name }}</td>
            <td>{{ skill.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
    sbt_id: -1,
    skills: [],
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
        res = await this.apiGetSbtAccount(this.walletAddress);
        this.sbt_id = res.data?.sbt_id;
        this.skills = res.data?.data || "";
      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

  },
}
</script>
