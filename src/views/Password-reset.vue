<template>
    <div class="varification-email">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <Navbar />
        <main class="">
            <section class="section content">
                <div class="border container pb-5">
                    <!--  Formulaire de test sur le téléphone -->
                    <form v-on:submit.prevent="getEmail" class="mx-auto col-md-5">
                        <p class="password-reset-title mt-3">{{ title }}</p>
                        <p class="mb-3">
                            {{ subTitle }}
                        </p>
                        <div v-if="messagebutton == 'Réinitialiser'">
                            <input type="email" id="email" name="email" placeholder="Adresse email"
                                class="contact__input border" @input="onChangeEmail($event)"
                                @change="onChangeEmail($event)" v-model="email" />
                            <p class="text-danger" style="font-size: 12px" v-if="!isValidEmail">
                                L'email est invalide
                            </p>
                            <p class="text-danger" style="font-size: 12px" v-if="error">
                                {{ error }}
                            </p>
                        </div>
                        <div>
                            <input type="submit" :value="messagebutton" name="Réinitialiser"
                                class="password-reset-btn d-block" :disabled="isDisabled"
                                v-if="messagebutton == 'Réinitialiser'" />
                            <input type="button" :value="messagebutton" name="Meconnecter"
                                class="password-reset-btn d-block" :disabled="isDisabled"
                                v-if="messagebutton == 'Me connecter'" @click="goToLogin" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
// import Footer from "../components/Footer.vue";
import axios from "axios";
import constant from "../../constant";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Password-reset",
  components: {
    Navbar,
    // Footer,
    Loading,
  },
  data() {
    return {
      email: "",
      error: "",
      title: "Mot de passe oublié ?",
      subTitle:
        "Nous vous enverrons par mail les instructions nécessaires pour réinitialiser votre mot de passe.",
      messagebutton: "Réinitialiser",
      isLoading: false,
      fullPage: true,
      isValidEmail: true,
      regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    };
  },
  methods: {
    getEmail() {
      if (this.email !== "" && this.isValidEmail == true) {
        this.isLoading = true;
        axios
          .get(constant.apiURL + "client/getEmail/" + this.email)
          .then((response) => {
            if (response.data == true) {
              console.log(response.data);
              this.error = "";
              localStorage.setItem("UserEmail", this.email);
              this.forgotpassword();
            } else {
              this.error = this.email + " n'existe pas";
              this.isLoading = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    forgotpassword() {
      axios
        .get(constant.apiURL + "client/forgotpassword/" + this.email)
        .then((response) => {
          if (response.data.code == 200) {
            setTimeout(() => {
              this.title = "Confirmation";
              this.subTitle =
                "Votre demande a été prise en compte. Un mail a été envoyé à l'adresse : " +
                this.email;
              this.messagebutton = "Me connecter";
              this.isLoading = false;
            }, 1000);
          } else {
            this.error =
              "Oups, une erreur est survenue. Veuillez réesayer plupart.";
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    goToLogin() {
      this.$router.push("/login");
    },
    onChangeEmail(e) {
      const textemail = e.target.value;
      this.isEmailValid(textemail);
    },
    isEmailValid: function(inputEmail) {
      this.isValidEmail = this.regexEmail.test(inputEmail);
    },
  },
  computed: {
    isDisabled() {
      // contrôle sur l'activation du bouton
      return !this.email;
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.password-reset-title {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

.password-reset-btn {
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

.password-reset-btn:hover {
  transition: 0.5s;
  background-color: #202122;
  color: #fff;
}
</style>
