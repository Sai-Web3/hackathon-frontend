<template>
  <div class="container">
    <div class="auth-box">

      <div class="text-center mt-5">
        <button type="button" class="btn btn-lg btn-primary btn-block mb-4" @click="getAccount">Connect Wallet</button>
      </div>

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
  }),
  async mounted() {
    if (window.ethereum) {
    } else {
      window.addEventListener("ethereum#initialized", this.handleEthereum, {
        once: true,
      });
      setTimeout(this.handleEthereum, 3000);
    }
  },
  methods: {
    
    // 
    handleEthereum: () => {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log(ethereum.selectedAddress);
        const myaddress = ethereum.selectedAddress;
        return myaddress;
      } else {
        console.log("Please install MetaMask!");
      }
    },

    // connect metamask
    getAccount: async function() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      this.$store.commit("setWalletAddress", accounts[0] || "");

      if(!accounts[0]) {
        return;
      }

      let res;
      try {
        res = await this.apiGetSbtAccount(accounts[0]);
        const sbt_id = res.data?.sbt_id;
          console.info(sbt_id)

        if(sbt_id == -1) {
          this.$router.push("/initial/ai");
        } else {
          this.$router.push("/mypage");
        }

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

  },
}
</script>
