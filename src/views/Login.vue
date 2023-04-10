<template>
  <div class="login">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <Navbar />
    <main class="">
      <section class="section content">
        <div class="bloc-login border container">
          <!--  Formulaire de test sur le téléphone -->
          <form v-on:submit.prevent="getTel" class="mx-auto col-md-5"
            v-if="testTel == false && inscriptionDisplay == false">
            <p class="login__title mt-3">{{ titre }}</p>
            <input type="tel" id="tel" name="tel" placeholder="numéro de téléphone" class="contact__input border"
              @change="onChangeTel($event)" @input="onChangeTel($event)"
              pattern="^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$" required v-model="telephone" />
            <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
              Le numéro est invalide
            </p>
            <input type="submit" value="Continuer" name="submit" class="default__btn d-block"
              :disabled="isDisabled" />
          </form>

          <!--  Formulaire de connexion -->
          <form v-on:submit.prevent="authentification" class="mx-auto col-md-5"
            v-if="testTel == true && inscriptionDisplay == false">
            <p class="login__title mt-3">{{ titre }}</p>
            <input type="tel" id="tel" name="tel" placeholder="numéro de téléphone" class="contact__input border"
              @change="onChangeTel($event)" @input="onChangeTel($event)"
              pattern="^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$" required v-model="telephone" />
            <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
              Le numéro de téléphone est invalide
            </p>
            <p class="text-danger" style="font-size: 12px">{{ error }}</p>
            <input type="password" id="password" name="password" placeholder="Mot de passe"
              class="contact__input border" v-model="password" />
            <input type="submit" value="Continuer" name="submit" class="default__btn d-block" /><br />
            <router-link to="password-reset" class="lien-formulaire">Mot de passe oublié ?</router-link>
          </form>
          <!--  Formulaire de connexion -->

          <!--  Formulaire d'inscription -->
          <form v-on:submit.prevent="inscription" class="mx-auto col-md-5" v-if="inscriptionDisplay == true">
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
            <!-- <p class="text-muted" style="font-size: 12px">
                Nous allons vous envoyer un code à 6 chiffres par mail
                pour la sécurité de votre compte.
              </p> -->
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
          </form>
          <!--  Formulaire d'inscription -->
        </div>
      </section>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Footer from "@/components/Footer.vue";
import axios from "axios";
import constant from "../../constant";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import md5 from "js-md5";

export default {
  name: "Login",
  components: {
    Navbar,
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
      titre: "Inscription ou connexion",
      error: "",
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    getTel() {
      // test sur l'existance du téléphone
      if (this.telephone !== "" && this.isValidTel == true) {
        this.isLoading = true;
        // let newtel = "+242 " + this.telephone;
        axios
          .get(constant.apiURL + "client/getTel/" + this.telephone)
          .then((response) => {
            if (response.data == true) {
              console.log(response.data);
              this.testTel = true;
              this.connexionDisplay = false;
              this.titre = "Connexion";
              this.isLoading = false;
            } else {
              // passer à l'inscription
              this.connexionDisplay = false;
              this.inscriptionDisplay = true;
              this.titre = "Inscription";
              this.isLoading = false;
            }
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
          });
      }
    },
    authentification() {
      this.isLoading = true;
      let encryptpassword = this.transformMD5(this.password);
      setTimeout(() => {
        axios
          .post(constant.apiURL + "login", {
            telephone: this.telephone,
            password: encryptpassword,
          })
          .then((response) => {
            if (response.status == 200) {
              // console.log(response.data);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userTelephone", response.data.telephone);
              this.isLoading = false;
              this.$router.push("/");
            } else {
              this.isLoading = false;
              // console.log(response.data);
              this.error = response.data.message;
            }
          })
          .catch(() => {
            // console.log(error);
            this.isLoading = false;
            this.error =
              "oups, nous ne parvenons pas à trouver ces identifiants. Réesayez.";
          });
      }, 2000);
    },
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
      return !this.telephone;
    },
    isDisabledtwo() {
      return !this.prenom && !this.email && !this.password;
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
.bloc-login {
  /* background-color: white; */
  padding-top: 65px;
  padding-bottom: 65px;
}

.login__title {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

</style>
