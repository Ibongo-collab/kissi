<template>
  <div class="login">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <main>
      <section class="content">
        <div class="bloc-login">
          <button class="arrow" @click="goBack">
            <i class='bx bx-left-arrow-alt icon'></i>
          </button>
          <div class="logo-center text-center">
            <img src="../assets/images/kissi.png" alt="logo kissi" width="70px">
          </div>
          <!--  Formulaire de connexion -->
          <form v-on:submit.prevent="authentification" class="mx-auto col-md-5 form-connexion">
            <p class="titre mt-3">{{ titre }}</p>
            <p class="text-muted">Renseignez votre email et votre mot de passe</p>
            <!-- Email -->
            <input type="email" id="email" name="email" placeholder="Email" class="contact__input border"
              @change="onChangeEmail($event)" @input="onChangeEmail($event)" required v-model="email" />
            <p class="text-danger" style="font-size: 12px" v-if="!isValidEmail">
              L'email est invalide
            </p>
            <!-- Password -->
            <input type="password" id="password" name="password" placeholder="Mot de passe"
              class="contact__input border" @input="onChangePassword($event)" @change="onChangePassword($event)"
              required v-model="password" />
            <p class="text-danger" style="font-size: 12px" v-if="!isValidPassword">
              Le mot de passe est invalide
            </p>
            <p class="text-danger" style="font-size: 12px">
              {{errorMessage}}
            </p>
            <input type="submit" value="Continuer" name="submit" class="default__btn d-block"
              :disabled="isDisabled" /><br />
            <router-link to="/password-forgot" style="color: #4f74da">Mot de passe oublié ?</router-link>
            <p>Vous n'avez pas de compte ? <router-link to="/inscription">Inscrivez-vous</router-link>
            </p>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  import constant from "../../constant";
  import Loading from "vue-loading-overlay";
  // import "vue-loading-overlay/dist/vue-loading.css";
  import CryptoJS from 'crypto-js'
  import md5 from "js-md5";
  import axios from "axios";

  export default {
    name: "Login",
    components: {
      Loading,
    },
    data() {
      return {
        isValidEmail: true,
        isValidPassword: true,
        email: "",
        password: "",
        prenom: "",
        telephone: "",
        regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        regexPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
        titre: "Connexion",
        errorMessage: "",
        isLoading: false,
        fullPage: true,
        testForm: true
      };
    },
    methods: {
      // Fonction pour crypter les données
      encryptData(data, key) {
        const encrypted = CryptoJS.AES.encrypt(data, key).toString()
        return encrypted
      },
      // Méthode d'authentification
      async authentification() {
        try {
          this.isLoading = true;
          const encryptPassword = this.transformMD5(this.password);
          const response = await axios.post(constant.apiURL + "login", {
            email: this.email,
            password: encryptPassword,
          });

          // console.log(response.data);

          if (response.status === 200 || response.status === 201) {
            if (response.data.profile === "PATIENT") {

              const token = response.data.accessToken;
              const refreshToken = this.encryptData(response.data.refreshToken, constant.secretKey);
              const email = this.encryptData(response.data.email, constant.secretKey);

              localStorage.setItem('token', token);
              localStorage.setItem('rKey', refreshToken);
              localStorage.setItem('eKey', email);
              
              // Récupérer le patient correspondant à cet email
              await this.getPatientByEmail(response.data.email);
            } else {
              this.errorMessage = "Identifiants invalides";
            }
          } else {
            this.errorMessage = "Ce compte n'est pas activé. Veuillez activer votre compte pour vous connecter";
          }
        } catch (error) {
          console.error(error);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        } finally {
          this.isLoading = false;
        }
      },
      // Méthode de récupération du patient
      getPatientByEmail(email) {
        this.$store.dispatch('getPatientByEmail', email)
          .then(() => {
            this.isLoading = false;
            /* 
            Si l'email de l'utilisateur est correcte alors naviguer vers la page précédente,
            s'il est en train de prendre un Rendez-vous sinon
            naviguer vers le tableau de bord
            */
            if (localStorage.getItem('rdvContinue')) {
              this.$router.push('/praticien');
            } else {
              this.$router.push('/tableau-de-bord');
            }
          })
          .catch(() => {
            // une erreur s'est produite lors de l'authentification, affichez un message d'erreur
            this.isLoading = false;
            this.errorMessage = 'email invalide';
          });
      },
      // Retour vers la page précédente
      goBack() {
        this.$router.go(-1); // retourne à la route précédente
      },
      onChangePassword(e) {
        const password = e.target.value;
        this.isPasswordValid(password);
      },
      isPasswordValid: function (inputPassword) {
        this.isValidPassword = this.regexPassword.test(inputPassword);
        if (this.isValidPassword) {
          this.testForm = false;
        }
      },
      onChangeEmail(e) {
        const textemail = e.target.value;
        this.isEmailValid(textemail);
      },
      isEmailValid: function (inputEmail) {
        this.isValidEmail = this.regexEmail.test(inputEmail);
      },
      transformMD5: function (pwd) {
        let newpwd = md5(pwd);
        return newpwd;
      },
    },
    computed: {
      isDisabled() {
        // contrôle sur l'activation du bouton
        return this.testForm;
      },
      isAuthenticated() {
        return this.$store.getters.isAuthenticated; // accéder à la valeur du getters
      }
    },
    mounted() {
      if (this.$store.getters.isAuthenticated === true) {
        this.$router.push('/tableau-de-bord');
      }
    },
  };
</script>

<style>
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