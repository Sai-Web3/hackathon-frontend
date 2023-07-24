<template>
  <div class="container">
    <div class="content">
      <div class="home_box">
        <div class="heading">Visualize Your<br/>Skill for New Era</div>
        <div class="button_box">
          <div class="connect_button" @click="connectWallet">Connect Wallet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      walletAddress: null,
      nonce: null,
    }
  },
  mounted() {
    if (!window.ethereum) {
      window.addEventListener("ethereum#initialized", this.handleEthereum, { once: true });
      setTimeout(this.handleEthereum, 3000);
    }
  },
  methods: {
    handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        this.walletAddress = ethereum.selectedAddress;
      } else {
        console.log("Please install MetaMask!");
      }
    },
    async connectWallet() {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        this.$store.commit("setWalletAddress", accounts[0] || "");
        if (accounts[0]) {
          const { data } = await this.apiGetSbtAccount(accounts[0]);
          if (data?.sbt_id === -1) {
            this.$router.push("/initial");
          } else {
            this.$store.commit("setSbtId", data?.sbt_id);
            this.$router.push("/mypage");
          }
        }
      } catch (error) {
        this.$log.error(error);
      }
    },
  },
}
</script>
