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
              <a href="#faq" class="nav__link">
                <i class='bx bx-question-mark nav__icon'></i>
                <span class="nav__name">Faq</span>
              </a>
            </li>

            <li class="nav__item">
              <router-link to="/rejoignez-flc" class="nav__link">
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
        <router-link to="/rejoignez-flc" class="nopc">Mon compte</router-link>
      </nav>
    </header>
  </div>
</template>

<script>
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  import { mapGetters } from "vuex";

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
      deconnexion() {
        localStorage.clear();
        this.$store.dispatch("logOutClient");
      }
    },
    computed: {
      ...mapGetters(["client"]),
    },
    created() {
      if(localStorage.getItem("token")) {
        this.$store.dispatch("getUser");
      } else {
        this.deconnexion();
      }
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