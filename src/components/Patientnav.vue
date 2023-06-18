<template>
  <div class="navbar">
    <!--=============== HEADER ===============-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <header class="header" id="header">
      <nav class="nav content">
        <router-link to="/tableau-de-bord" class="nav__logo">
          <img src="../assets/images/kissi.png" alt="logo Kissi" class="logo">
        </router-link>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">

            <!-- <li class="nav__item">
              <div class="nav__link">
                <span class="nav__name">Mes documents</span>
              </div>
            </li> -->

            <li class="nav__item">
              <div class="nav__link">
                <span class="nav__name">Mes rendez-vous</span>
              </div>
            </li>

            <li class="nav__item nomobile">
              <div class="nav__link" @click="logout()">
                <span class="nav__name">Déconnexion</span>
              </div>
            </li>
            
          </ul>
        </div>
        <li class="nav__item">
          <router-link to="/tableau-de-bord" class="nav__link nopc">
            <span class="nav__name">Bonjour {{patient.username}}</span>
          </router-link>
        </li>
      </nav>
    </header>
  </div>
</template>

<script>
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  import {
    mapGetters
  } from "vuex";
  import CryptoJS from 'crypto-js'
  import constant from "../../constant"
  import axios from 'axios';

  export default {
    name: 'Patientnav',
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
      // Fonction pour décrypter les données
      decryptData(data, key) {
        const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
        return decrypted;
      },
      async logout() {
        const EMAIL_KEY = 'eKey';
        const REFRESH_TOKEN_KEY = 'rKey';
        try {
          this.isLoading = true;
          const email = this.decryptData(localStorage.getItem(EMAIL_KEY), constant.secretKey);
          const refreshToken = this.decryptData(localStorage.getItem(REFRESH_TOKEN_KEY), constant.secretKey);

          const response = await axios.post(constant.apiURL + 'auth/logout', {
            refreshToken: refreshToken,
            email: email,
          });

          this.isLoading = false;
          // console.log(response);

          if (response.data.code === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('eKey');
            localStorage.removeItem('rKey');
            this.$store.dispatch('logout');
            this.$router.push('/');
          }
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
      }

    },
    computed: {
      ...mapGetters(["patient"]),
      isAuthenticated() {
        return this.$store.getters.isAuthenticated; // accéder à la valeur du getters
      },
    },
    created() {},
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav__item:hover {
    cursor: pointer;
  }

  .logo,
  .panier {
    margin-top: -0.235ex;
    vertical-align: middle;
  }

  .nopc {
    color: black;
  }

  ul {
    list-style: none;
  }

  .nav__menu {
    margin-left: 600px;
  }

  @media (max-width: 973px) {
    .nav__menu {
      margin-left: 500px;
    }
  }

  @media (max-width: 873px) {
    .nav__menu {
      margin-left: 400px;
    }
  }

  @media only screen and (min-width: 769px) and (max-width: 773px) {
    .nav__menu {
      margin-left: 390px;
    }
  }

  @media (max-width: 768px) {
    .nomobile {
      display: none;
    }
  }

  @media (min-width: 767px) {
    .nopc {
      display: none;
    }
  }
</style>