<template>
  <div class="content">
    <div class="form-group">
      <label>Hi! Are you ready to Covert your careers into Skill Elements?</label>
      <div>
        <label><input type="radio" value="Engineer" checked> Engineer</label><br/>
        <label><input type="radio" value="Designer" disabled> Designer</label><br/>
        <label><input type="radio" value="Biz" disabled> Biz</label>        
      </div>
    </div>

    <div class="form-group">
      <label>You are Engineer! That sounds great! Tell me what coding languages can you do?</label>
      <div>
        <div class="form-group">
          <label>If you do see your subjects, send a request</label>
        </div>   
      </div>
    </div>

    <div class="form-group">
      <label>What things have you done? Give me as much detailed as possible</label>
      <textarea class="form-control" rows="5"></textarea>
    </div>

    <div class="form-group">
      <label>How long have you used those skills?</label>
      <textarea class="form-control" rows="5"></textarea>
    </div>

    <div class="form-group text-center">
      <div class="btn btn-primary" @click="analysis">Analysis</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Web3 from "web3";

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    walletAddress: null,
    nonce: null,
    inputs: {
      career: '',
      histories: [],
      achievement: '',
      term: '',
    }
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
  },
  methods: {

    getAccount: async function() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },

    analysis: async function() {
      let res;
      try {
        res = await this.apiPostAiAnalysis(this.inputs.career, this.inputs.histories, this.inputs.achievement, this.inputs.term);
        this.$store.commit("setSkills", res.data.result || []);
        this.$router.push("/initial/mint");
      } catch (error) {
        this.$log.error(error);
        return;
      }
    }

  },
}
</script>
