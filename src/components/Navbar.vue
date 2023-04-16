<template>
  <div class="navbar">
    <!--=============== HEADER ===============-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <header class="header" id="header">
      <nav class="nav content">
        <router-link to="/" class="nav__logo">
          <img src="../assets/images/kissi.png" alt="logo Kissi" class="logo">
        </router-link>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">

            <li class="nav__item">
              <router-link to="/tableau-de-bord" class="nav__link">
                <span class="nav__name">Mon compte</span>
              </router-link>
            </li>

            <li class="nav__item nomobile">
              <router-link to="/rejoignez-kissi" class="nav__link">
                <span class="nav__name">Vous êtes praticien</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to="/tableau-de-bord" class="nopc">Mon compte</router-link>
      </nav>
    </header>
  </div>
</template>

<script>
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  // import { mapGetters } from "vuex";

  export default {
    name: 'Navbar',
    components: {
      Loading
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        isconnected: false,
      }
    },
    methods: {
    },
    computed: {
      // ...mapGetters(["client"]),
    },
    created() {
    },
    mounted(){}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .logo, .panier{
    margin-top: -0.235ex;
    vertical-align: middle;
  }

  .nopc {
    color: black;
  }

  ul {
    list-style: none;
  }

  @media (max-width: 768px) {
    .nomobile {
      display: none;
    }
  }

    @media (min-width: 768px) {
    .nopc {
      display: none;
    }
  }

</style>