<template>
  <div class="content">

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

    <div class="form-group text-center">
      <div class="btn btn-primary" :class="{ 'hide': isConfirmation }" @click="mint">Mint</div>
      <div :class="{ 'hide': !isConfirmation }"><i class="fa fa-spinner"></i></div>
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
    skills: [],
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

    initialize: function() {
      this.skills = this.$store.state.skills;
    },

    mint: async function() {

      this.isConfirmation = true;

      let res;
      let calldata;
      let sbt_address;
      let gas_limit;
      let gas_price;
      try {
        res = await this.apiPostMintParameter(this.walletAddress);
        sbt_address = res.data?.sbt_address || "";
        gas_limit = res.data?.gas_limit || "";
        gas_price = res.data?.gas_price || "";
        calldata = res.data?.calldata || "";
      } catch (error) {
        this.$log.error(error);
        this.isConfirmation = false;
        return;
      }

      if(!sbt_address || !gas_limit || !gas_price || !calldata) {
        this.isConfirmation = false;
        return;
      }

      const params = [
        {
          from: this.$store.state.walletAddress,
          to: sbt_address,
          gas: Web3.utils.toHex(parseInt(gas_limit)),
          gasPrice: Web3.utils.toHex(parseInt(gas_price)),
          value: "0x0",
          data: calldata,
        },
      ];

      window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result) => {
        this.wait();
      })
      .catch((error) => {
        this.isConfirmation = false;
        console.info(error)
      });

    },

    wait: async function() {
      let index = 0;
      while(true) {

        const sbt_id = await this.confirmation();

        if(sbt_id != -1) {
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        index++;
      }
      this.isConfirmation = false;
      this.$router.push("/mypage");
    },

    confirmation: async function() {
      let res
      try {
        res = await this.apiGetSbtAccount(this.walletAddress);
        return res.data?.sbt_id;
      } catch (error) {
        return -1;
      }
    },


  },
}
</script>
