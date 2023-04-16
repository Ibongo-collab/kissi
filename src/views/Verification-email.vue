<template>
  <div class="varification-email">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <Navbar />
    <main class="">
      <section class="section content">
        <div class="bloc-login border container">
          <form v-on:submit.prevent="activateaccount" class="mx-auto col-md-5" v-if="verifyEmail">
            <p class="verification__title mt-3">Vérification du compte</p>
            <p class="mb-3">
              Le code de vérification vous a été envoyé sur
              <span class="email">{{ client.email }}</span>. <br />
              Merci de l'entrer ci-dessous.
            </p>
            <input type="texte" id="code" name="code" placeholder="code de vérification" class="contact__input border"
              v-model="code" />
            <p class="text-danger" style="font-size: 12px" v-if="error">
              {{ error }}
            </p>
            <input type="submit" value="Continuer" name="submit" class="verification__btn d-block"
              :disabled="isDisabled" />
            <p class="lien-formulaire" @click="remakeverification">
              <router-link to="/verification-email">
                Renvoyez-moi un code de vérification
              </router-link>
            </p>
          </form>

          <form v-on:submit.prevent="verificationcode" class="mx-auto col-md-5" v-else>
            <p class="verification__title mt-3">Vérification du compte</p>
            <p class="mb-3">
              Le code de vérification vous a été envoyé sur
              <span class="email">{{ email }}</span>. <br />
              Merci de l'entrer ci-dessous.
            </p>
            <input type="texte" id="code" name="code" placeholder="code de vérification" class="contact__input border"
              v-model="code" />
            <p class="text-danger" style="font-size: 12px" v-if="error">
              {{ error }}
            </p>
            <input type="submit" value="Continuer" name="submit" class="verification__btn d-block"
              :disabled="isDisabled" />
            <p class="lien-formulaire" @click="remakeverification">
              <router-link to="/verification-email">
                Renvoyez-moi un code de vérification
              </router-link>
            </p>
          </form>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Navbar from "../components/Navbar.vue";
  import Footer from "../components/Footer.vue";
  import axios from "axios";
  import constant from "../../constant";
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  import Swal from "sweetalert2";

  export default {
    name: "Verification-email",
    components: {
      Navbar,
      Footer,
      Loading,
    },
    data() {
      return {
        code: "",
        error: "",
        verifyEmail: false,
        email: localStorage.getItem("userMail"),
        isLoading: false,
        fullPage: true,
      };
    },
    methods: {
      verificationcode() {
        if (this.code !== null) {
          this.isLoading = true;
          axios
            .get(constant.apiURL + "client/activateaccount/" + this.code + "/" + this.email)
            .then((response) => {
              if (response.data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Votre compte a été activé avec succès. Vous serez rediriger vers la page de connexion",
                  showConfirmButton: true,
                });
                this.isLoading = false;
                this.$router.push("/login");
              } else if (response.data.code == 500) {
                this.error =
                  "Nous ne pouvons identifier cette requête. Il est probable que ce lien soit expiré. Veuillez ré-essayer ou contacter le support client";
                this.isLoading = false;
              } else if (response.data.code == 404) {
                this.error =
                  'Code incorrect. Vérifiez que vous avez bien renseigner le code, ou cliquer sur "Renvoyez-moi un code de vérification" ';
                this.isLoading = false;
              }
            })
            .catch((error) => {
              console.log(error);
              this.error = "Une erreur est survenue, veuillez réesayer plutard"
              this.isLoading = false;
            });
        } else {
          this.error = "Veuillez renseignez le code";
          this.isLoading = false;
        }
      },
      activateaccount() {
        if (this.code !== null) {
          const token = localStorage.getItem("token");
          this.isLoading = true;
          axios
            .get(constant.apiURL + "client/activateactiveaccount/" + this.code + "/" + this.email, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              if (response.data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Votre adress email a été vérifiée.",
                  showConfirmButton: true,
                });
                this.isLoading = false;
                this.$router.push("/profil");

              } else if (response.data.code == 404) {
                this.error ='Code incorrect. Vérifiez que vous avez bien renseigner le code, ou cliquer sur "Renvoyez-moi un code de vérification" ';
                this.isLoading = false;
              }
            }).catch((error) => {
              console.log(error);
              this.error = "Une erreur est survenue, veuillez réesayer plutard"
              this.isLoading = false;
            });
        } else {
          this.error = "Veuillez renseignez le code";
          this.isLoading = false;
        }
      },
      remakeverification() {
        this.isLoading = true;
        axios.get(constant.apiURL + "client/remakeactivation/" + this.email)
          .then((response) => {
            // console.log(response);
            if (response.data.code == 200) {
              this.error = "";
              this.isLoading = false;
              Swal.fire({
                icon: "success",
                title: response.data.message,
                showConfirmButton: true,
              });
            } else if (response.data.code == 404) {
              this.isLoading = false;
              this.$router.push("/login");
            }
          })
      },
    },
    computed: {
      ...mapGetters(["client"]),
      isDisabled() {
        // contrôle sur l'activation du bouton
        return !this.code;
      },
    },
    mounted() {

    },
  };
</script>

<style scoped>

  .verification__title {
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 1.5rem;
  }

  .verification__btn {
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

  .verification__btn:hover {
    transition: 0.5s;
    background-color: #202122;
    color: #fff;
  }

  .email {
    font-weight: 600;
    font-size: 15px;
  }
</style>