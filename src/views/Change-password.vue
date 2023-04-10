<template>
    <div class="varification-email">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <!-- <Navbar /> -->
        <main class="">
            <section class="section content">
                <div class="border container pb-5">
                    <!--  Formulaire de test sur le téléphone -->
                    <form v-on:submit.prevent="resetpassword" class="mx-auto col-md-5">
                        <p class="change-password-title mt-3">{{ title }}</p>
                        <p class="mb-3">
                            {{ subTitle }}
                        </p>
                        <div v-if="test === false">
                            <input type="password" id="password" name="password" placeholder="Mot de passe"
                                class="contact__input border" @input="onChangePassword($event)"
                                @change="onChangePassword($event)" v-model="password" />
                            <p class="text-danger" style="font-size: 12px" v-if="!isValidPassword">
                                Veuillez respecter le format indiqué
                            </p>
                            <p class="text-danger" style="font-size: 12px" v-if="error">
                                {{ error }}
                            </p>
                        </div>
                        <div>
                            <input type="submit" value="Enregistrer" name="Enregistrer"
                                class="change-password-btn d-block" :disabled="isDisabled" v-if="test === false" />
                            <input type="button" value="Me connecter" name="Meconnecter"
                                class="change-password-btn d-block" :disabled="isDisabled" v-if="test === true"
                                @click="goToLogin" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
// import Navbar from "../components/Navbar.vue";
// import Footer from "../components/Footer.vue";
import axios from "axios";
import constant from "../../constant";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import md5 from "js-md5";

export default {
  name: "Change-password",
  components: {
    // Navbar,
    // Footer,
    Loading,
  },
  data() {
    return {
      password: "",
      error: "",
      title: "Choix du nouveau mot de passe",
      subTitle:
        "Votre mot de passe doit contenir au moins 6 caractères minimum avec une lettre majuscule, une minuscule et des chiffres",
      regexPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
      isValidPassword: true,
      test: false,
      isLoading: false,
      fullPage: true,
      email: "",
    };
  },
  methods: {
    resetpassword() {
      if (this.password !== "" && this.isValidPassword == true) {
        this.isLoading = true;
        let encryptpassword = this.transformMD5(this.password);
        setTimeout(() => {
          axios
            .post(
              constant.apiURL +
                "client/resetpassword/" +
                this.email, 
                {
                  password: encryptpassword
                }
            )
            .then((response) => {
              if (response.data.code == 200) {
                this.title = "Confirmation";
                this.subTitle = response.data.message;
                this.test = true;
                localStorage.removeItem("UserEmail");
                this.isLoading = false;
              } else {
                this.error = response.data.message;
                this.isLoading = false;
                console.log(response.data);
              }
            })
            .catch((error) => {
              this.error = "Une erreur est survenue, veuillez réesayez";
              this.isLoading = false;
              console.log(error);
            });
        }, 2000);
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    onChangePassword(e) {
      const password = e.target.value;
      this.isPasswordValid(password);
    },
    isPasswordValid: function(inputPassword) {
      this.isValidPassword = this.regexPassword.test(inputPassword);
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
      return !this.password;
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/");
    }
    this.email = this.$route.query.email;
    console.log(this.email)
  },
};
</script>

<style scoped>
.change-password-title {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

.change-password-btn {
  background-color: black;
  color: #fff;
  padding: 0.8rem 1rem;
  border: 1px solid black;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  outline: none;
}

.change-password-btn:hover {
  transition: 0.5s;
  background-color: #202122;
  color: #fff;
}
</style>
