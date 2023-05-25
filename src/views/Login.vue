<template>
  <div class="login">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <!-- <Navbar /> -->
    <main class="">
      <section class="content">
        <div class="bloc-login">
          <button class="arrow" @click="goBack">
            <i class='bx bx-left-arrow-alt icon'></i>
          </button>
          <div class="logo-center text-center">
            <img src="../assets/images/kissi.png" alt="logo kissi" width="70px">
          </div>

          <!--  Formulaire de connexion -->
          <form v-on:submit.prevent="authentification" class="mx-auto col-md-5 form-connexion"
            v-if="inscriptionDisplay == false">
            <p class="titre mt-3">{{ titre }}</p>
            <p class="text-muted">Renseignez votre email et votre mot de passe</p>

            <!-- Email -->
            <input type="email" id="email" name="email" placeholder="Email" class="contact__input border"
              @change="onChangeEmail($event)" @input="onChangeEmail($event)"
              pattern="^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required v-model="email" />
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
          </form>

          <!--  Formulaire d'inscription -->
          <!-- <form v-on:submit.prevent="inscription" class="mx-auto col-md-5" v-if="inscriptionDisplay == true">
            <p class="login__title mt-3">{{ titre }}</p>
            <input type="text" id="prenom" name="prenom" placeholder="Prénom" class="contact__input border"
              v-model="prenom" />
            <input type="email" id="email" class="contact__input border" @input="onChangeEmail($event)"
              @change="onChangeEmail($event)" placeholder="Email" v-model="email" />
            <p class="text-danger" style="font-size: 12px" v-if="!isEmailValid">
              L'email est invalide
            </p>
            <p class="text-danger" style="font-size: 12px" v-if="error">
              {{ error }}
            </p>
            <input type="password" id="password" name="password" placeholder="Mot de passe"
              class="contact__input border" @input="onChangePassword($event)" @change="onChangePassword($event)"
              v-model="password" />
            <p class="text-danger" style="font-size: 12px" v-if="!isValidPassword">
              Le mot de passe est invalide
            </p>
            <p class="text-muted" style="font-size: 12px">
              Votre mot de passe doit contenir au moins 6 caractères minimum
              avec une lettre majuscule, une minuscule et des chiffres
            </p>
            <input type="submit" value="Inscription" name="submit" class="default__btn d-block"
              :disabled="isDisabledtwo" /><br />
            <p class="text-muted">
              En continuant, vous acceptez nos
              <router-link to="">Conditions Générales</router-link> et notre
              <router-link to="">Politique de Confidentialité</router-link>.
              Nous utilisons vos données personnelles pour vous offrir une
              expérience personnalisée, ainsi que pour mieux comprendre et
              améliorer notre service.
            </p>
          </form> -->
        </div>
      </section>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";
// import Footer from "@/components/Footer.vue";
import axios from "axios";
import constant from "../../constant";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import CryptoJS from 'crypto-js'
import md5 from "js-md5";

export default {
  name: "Login",
  components: {
    // Navbar,
    // Footer,
    Loading,
  },
  data() {
    return {
      passwordDisplay: false,
      inscriptionDisplay: false,
      connexionDisplay: false,
      emailTest: false,
      isValidEmail: true,
      isValidPassword: true,
      isValidTel: true,
      testEmail: false,
      testTel: false,
      email: "",
      password: "",
      prenom: "",
      telephone: "",
      regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      regexPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
      regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
      titre: "Connexion",
      error: "",
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
    authentification() {
      this.isLoading = true;
      const credentials = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('login', credentials)
        .then(() => {
          // l'utilisateur est authentifié, vérifions son email pour continuer
          this.getPatientByEmail();
        })
        .catch(() => {
          // une erreur s'est produite lors de l'authentification, affichez un message d'erreur
          this.isLoading = false;
          this.errorMessage = 'Identifiants invalides';
        });
    },
    // Méthode de récupération du patient
    getPatientByEmail() {
      const email = localStorage.getItem("emailUser");
      this.$store.dispatch('getPatientByEmail', email)
        .then(() => {
          this.isLoading = false;
          /** 
          Si l'email de l'utilisateur est correcte alors naviguer vers la page précédente,
          s'il est en train de prendre un Rendez-vous sinon
          naviguer vers le tableau de bord
          **/
          if (localStorage.getItem('rdvContinue')) {
            let myIdString = localStorage.getItem('currentMedecinId')
            localStorage.setItem('medecinId',this.encryptData(myIdString, constant.secretKey))
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
    // getTel() {
    //   // test sur l'existance du téléphone
    //   if (this.telephone !== "" && this.isValidTel == true) {
    //     this.isLoading = true;
    //     // let newtel = "+242 " + this.telephone;
    //     axios
    //       .get(constant.apiURL + "client/getTel/" + this.telephone)
    //       .then((response) => {
    //         if (response.data == true) {
    //           console.log(response.data);
    //           this.testTel = true;
    //           this.connexionDisplay = false;
    //           this.titre = "Connexion";
    //           this.isLoading = false;
    //         } else {
    //           // passer à l'inscription
    //           this.connexionDisplay = false;
    //           this.inscriptionDisplay = true;
    //           this.titre = "Inscription";
    //           this.isLoading = false;
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.isLoading = false;
    //       });
    //   }
    // },
    // authentification() {
    //   this.isLoading = true;
    //   let encryptpassword = this.transformMD5(this.password);
    //   setTimeout(() => {
    //     axios
    //       .post(constant.apiURL + "login", {
    //         telephone: this.telephone,
    //         password: encryptpassword,
    //       })
    //       .then((response) => {
    //         if (response.status == 200) {
    //           // console.log(response.data);
    //           localStorage.setItem("token", response.data.token);
    //           localStorage.setItem("userTelephone", response.data.telephone);
    //           this.isLoading = false;
    //           this.$router.push("/");
    //         } else {
    //           this.isLoading = false;
    //           // console.log(response.data);
    //           this.error = response.data.message;
    //         }
    //       })
    //       .catch(() => {
    //         // console.log(error);
    //         this.isLoading = false;
    //         this.error =
    //           "oups, nous ne parvenons pas à trouver ces identifiants. Réesayez.";
    //       });
    //   }, 2000);
    // },
    inscription() {
      if (
        this.isValidEmail === true &&
        this.isValidPassword === true &&
        this.prenom !== ""
      ) {
        this.isLoading = true;
        let encryptpassword = this.transformMD5(this.password);
        axios
          .post(constant.apiURL + "client/save", {
            prenom: this.prenom,
            email: this.email,
            password: encryptpassword,
            telephone: this.telephone,
          })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              // console.log(response.data);
              if (response.data.id !== null) {
                /**
                 * Le LocalStorage security me permet de garantir qu'un utilisateur qui ne possède pas
                 * le token puisse accéder à la page "/verication-email" car si sur la page en question,
                 * le localstorage security n'existe pas, l'utlisateur n'aura pas accès à la page.
                */
                
                localStorage.setItem("userMail", this.email);
                console.log(localStorage.getItem("userMail"));
                localStorage.setItem("userTel", this.telephone);
                console.log(localStorage.getItem("userTel"));
                localStorage.setItem("security", true);
                console.log("go to verification email");
                this.$router.push("/verification-email");
                this.isLoading = false;
              } else {
                this.error = "L'email existe déjà";
                this.isLoading = false;
              }
            } else {
              console.log(response.status);
              this.error =
                "Une erreur est survenue, veuillez réessayer plutard";
              this.isLoading = false;
            }
          })
          .catch((error) => {
            console.log(error);
            this.error = "Une erreur est survenue, veuillez réessayer plutard";
            this.isLoading = false;
          });
      }
    },
    onChangePassword(e) {
      const password = e.target.value;
      this.isPasswordValid(password);
    },
    isPasswordValid: function(inputPassword) {
      this.isValidPassword = this.regexPassword.test(inputPassword);
      if (this.isValidPassword) {
        this.testForm = false;
      }
    },
    onChangeTel(e) {
      const numero = e.target.value;
      this.isTelephoneValid(numero);
    },
    isTelephoneValid: function(inputTel) {
      this.isValidTel = this.regexTelephone.test(inputTel);
    },
    onChangeEmail(e) {
      const textemail = e.target.value;
      this.isEmailValid(textemail);
    },
    isEmailValid: function(inputEmail) {
      this.isValidEmail = this.regexEmail.test(inputEmail);
    },
    transformMD5: function(pwd) {
      // pwd = pwd.toUpperCase();
      let newpwd = md5(pwd);
      return newpwd;
    },
  },
  computed: {
    isDisabled() {
      // contrôle sur l'activation du bouton
      return this.testForm;
    },
    isDisabledtwo() {
      return !this.prenom && !this.email && !this.password;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // accéder à la valeur du getters
    }
  },
  mounted() {
    if (this.$store.getters.isAuthenticated === true) {
      this.$router.push("/tableau-de-bord");
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
