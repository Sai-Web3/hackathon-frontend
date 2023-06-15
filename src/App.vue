<template>
  <div id="app">
    <ModalDialog v-if="$store.state.showModalDialog"></ModalDialog>
    <header class="navbar">
      <div class="container-fluid">
        <div class="nav-link" @click="toggleSidebar"><i class="fa-solid fa-bars"></i></div>
      </div>
    </header>
    <div class="container-fluid">
      <nav id="sidebar" class="" :class="{ 'open': isOpen }" @toggle="toggleSidebar">
        <div class="">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page">
                <span data-feather="home" class="align-text-bottom"></span>
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/mypage" class="nav-link" aria-current="page">
                <span data-feather="home" class="align-text-bottom"></span>
                Connect Account
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sbt/search" class="nav-link" aria-current="page">
                <span data-feather="home" class="align-text-bottom"></span>
                Find other SBTs
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/match/search" class="nav-link" aria-current="page">
                <span data-feather="home" class="align-text-bottom"></span>
                Find your matches
              </router-link>
            </li>
          </ul>
          <ul class="nav flex-column">
            <li class="nav-item">
              <div class="nav-link" @click="logout">
                <span data-feather="home" class="align-text-bottom"></span>
                Log-out
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      isOpen: false,
    };
  },
  async created() {
  },
  computed: {
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      this.$store.commit("setWalletAddress", "");
      this.$router.push("/");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
