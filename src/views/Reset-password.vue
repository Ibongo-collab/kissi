<template>
  <div class="Password-forgot">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <!-- <Navbar /> -->
    <main class="">
      <section class="content">
        <div class="bloc-login">
          <div class="logo-center text-center">
            <img src="../assets/images/kissi.png" alt="logo kissi" width="70px">
          </div>

          <!--  Formulaire de réinitialisation de mot de passe -->
          <form v-on:submit.prevent="resetpassword" class="mx-auto col-md-5 form-connexion" v-if="test === false">
            <p class="titre mt-3">{{titre}}</p>
            <p class="text-muted">{{subtitle}}</p>
            <input type="password" id="password" name="password" placeholder="Mot de passe"
              class="contact__input border" @input="onChangePassword($event)" @change="onChangePassword($event)"
              v-model="password" />

            <p class="text-danger" style="font-size: 12px" v-if="!isValidPassword">
              Veuillez respecter le format indiqué
            </p>
            <p class="text-danger" style="font-size: 12px" v-if="errorMessage">
              {{ errorMessage }}
            </p>
            <input type="submit" value="Confirmer" name="confirmer" class="default__btn d-block"
              :disabled="isDisabled" />
          </form>

          <!-- Message de confirmation -->
          <div class="form-confirmation mx-auto text-center col-md-5" v-if="test === true">
            <p class="titre mt-3">{{titre}}</p>
            <p class="text-muted">{{subtitle}}</p>
            <div class="content__btn mx-auto">
              <button class="default__btn" @click="goToLogin">Me connecter</button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script>
  import axios from 'axios';
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  import constant from '../../constant';
  import md5 from "js-md5";

  export default {
    name: "ResetPassword",
    components: {
      Loading,
    },
    data() {
      return {
        email: "",
        token: "",
        password: "",
        regexPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        isValidPassword: true,
        titre: "Choix du nouveau mot de passe",
        subtitle: "Votre mot de passe doit comprendre 6 caractères minimum, dont 1 chiffre et 1 majuscule",
        errorMessage: "",
        isLoading: false,
        fullPage: true,
        testPassword: true,
        test: false,
      };
    },
    methods: {
      // Méthode d'authentification
      resetpassword() {
        this.isLoading = true;
        let encryptpassword = this.transformMD5(this.password);
        axios.post(constant.apiURL + "auth/updatePassword", {
            email: this.email,
            token: this.token,
            password: encryptpassword,
          })
          .then((response) => {
            console.log(response)
            if (response.data.code === 200) {
              this.isLoading = false;
              this.test = true;
              this.titre = "Confirmation"
              this.subtitle = response.data.message;
            } else {
              this.isLoading = false;
              this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
            }
          })
          .catch(() => {
            this.isLoading = false;
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          });
      },

      /** retourne à la route précédente */
      goToLogin() {
        this.$router.push("/authentification");
      },
      onChangePassword(e) {
        const password = e.target.value;
        this.isPasswordValid(password);
      },
      isPasswordValid: function (inputPassword) {
        this.isValidPassword = this.regexPassword.test(inputPassword);
        if (this.isValidPassword) {
          this.testPassword = false;
        }
      },
      transformMD5: function (pwd) {
        // pwd = pwd.toUpperCase();
        let newpwd = md5(pwd);
        return newpwd;
      },
    },
    computed: {
      isDisabled() {
        // contrôle sur l'activation du bouton
        return this.testPassword;
      },
    },
    mounted() {
      // if (this.$store.getters.isAuthenticated === true) {
      //   this.$router.push("/tableau-de-bord");
      // }
      this.token = this.$route.query.token;
      this.email = this.$route.query.email;
    },
  };
</script>

<style>
  .titre {
    line-height: 40px;
  }

  .bloc-login {
    margin-top: 30px;
  }

  .form-connexion {
    box-shadow: rgba(0, 0, 0, 0.1) 10px 10px 30px;
    transition: box-shadow 0.2s ease 0s;
    background-color: rgb(255, 255, 255);
    padding: 32px;
    border-radius: 20px;
  }
</style>