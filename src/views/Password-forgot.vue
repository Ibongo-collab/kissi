<template>
  <div class="Password-forgot">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <main class="">
      <section class="content">
        <div class="bloc-login">
          <button class="arrow" @click="goBack">
            <i class='bx bx-left-arrow-alt icon'></i>
          </button>
          <div class="logo-center text-center">
            <img src="../assets/images/kissi.png" alt="logo kissi" width="70px">
          </div>
          <!--  Formulaire de réinitialisation de mot de passe -->
          <form v-on:submit.prevent="sendEmail" class="mx-auto col-md-5 form-password-forgot" v-if="testForm">
            <p class="titre mt-3">{{ titre }}</p>
            <p class="text-muted">Nous vous enverrons un mail avec les instructions nécessaires pour
              réinitialiser votre mot de passe</p>

            <!-- Email -->
            <input type="email" id="email" name="email" placeholder="Email" class="contact__input border"
              @change="onChangeEmail($event)" @input="onChangeEmail($event)"
              pattern="^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required v-model="email" />

            <p>{{message}}</p>

            <p class="text-danger" style="font-size: 12px" v-if="!isValidEmail">
              L'email est invalide
            </p>

            <p class="text-danger" style="font-size: 12px">
              {{errorMessage}}
            </p>

            <input type="submit" value="Réinitialiser" name="submit" class="default__btn d-block"
              :disabled="isDisabled" /><br />
          </form>
          <!-- Message de confirmation -->
          <div class="form-confirmation mx-auto text-center col-md-5" v-else>
            <p class="titre mt-3">{{titre}}</p>
            <p class="text-muted">{{message}}</p>
            <div class="content__btn mx-auto">
              <button class="default__btn" @click="goToHome">Quitter</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  import axios from 'axios';
  import Loading from "vue-loading-overlay";
  // import "vue-loading-overlay/dist/vue-loading.css";
  import constant from '../../constant';

  export default {
    name: "Password-forgot",
    components: {
      Loading,
    },
    data() {
      return {
        isValidEmail: true,
        testEmail: true,
        email: "",
        regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        titre: "Réinitialiser le mot de passe",
        errorMessage: "",
        message: "",
        isLoading: false,
        fullPage: true,
        testForm: true
      };
    },
    methods: {
      // Méthode d'authentification
      sendEmail() {
        this.isLoading = true;
        axios.post(constant.apiURL + "auth/resetPassword", {
            email: this.email,
            route: constant.URL,
          })
          .then((response) => {
            // console.log(response)
            if (response.data.code === 200) {
              this.testForm = false;
              this.titre = "Confirmation";
              this.message = "Votre demande a été prise en compte.\nUn mail a été envoyé à l'adresse : " + this.email;
            } else {
              this.errorMessage = "Cette adresse e-mail n'existe pas";
            }
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = 'Un problème est survenu. Veuillez réessayer';
          })
          .finally(() => {
            this.isLoading = false;
          });
      },

      // retourne à la route précédente
      goBack() {
        this.$router.go(-1);
      },
      goToHome() {
        this.$router.push("/");
      },
      onChangeEmail(e) {
        const textemail = e.target.value;
        this.isEmailValid(textemail);
      },
      isEmailValid: function (inputEmail) {
        this.isValidEmail = this.regexEmail.test(inputEmail);
        if (this.isValidEmail) {
          this.testEmail = false;
        }
      },
    },
    computed: {
      isDisabled() {
        // contrôle sur l'activation du bouton
        return this.testEmail;
      },
    },
    mounted() {
      if (this.$store.getters.isAuthenticated === true) {
        this.$router.push('/tableau-de-bord');
      }
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

  .form-password-forgot {
    box-shadow: rgba(0, 0, 0, 0.1) 10px 10px 30px;
    transition: box-shadow 0.2s ease 0s;
    background-color: rgb(255, 255, 255);
    padding: 32px;
    border-radius: 20px;
  }
</style>