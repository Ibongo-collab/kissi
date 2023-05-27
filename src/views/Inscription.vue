<template>
    <div class="login">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <!-- <Navbar /> -->
        <main class="">
            <section class="content mb-5">
                <div class="bloc-login">
                    <button class="arrow" @click="goBack">
                        <i class='bx bx-left-arrow-alt icon'></i>
                    </button>
                    <div class="logo-center text-center">
                        <img src="../assets/images/kissi.png" alt="logo kissi" width="70px">
                    </div>

                    <!--  Formulaire de connexion -->
                    <form v-on:submit.prevent="inscription" class="mx-auto col-md-5 form-connexion" v-if="testForm">
                        <p class="titre mt-3">{{ titre }}</p>
                        <!-- Nom -->
                        <input type="text" id="nom" name="nom" placeholder="Nom" class="contact__input border"
                           required v-model="nom" />
                        <!-- Prenom -->
                        <input type="text" id="prenom" name="prenom" placeholder="Pénom" class="contact__input border"
                           required v-model="prenom" />
                        <!-- Email -->
                        <input type="email" id="email" name="email" placeholder="Email" class="contact__input border"
                            @change="onChangeEmail($event)" @input="onChangeEmail($event)"
                            pattern="^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required v-model="email" />
                        <p class="text-danger" style="font-size: 12px" v-if="!isValidEmail">
                            L'email est invalide
                        </p>
                        <!-- Password -->
                        <input type="password" id="password" name="password" placeholder="Mot de passe"
                            class="contact__input border" @input="onChangePassword($event)"
                            @change="onChangePassword($event)" required v-model="password" />
                        <p class="text-danger" style="font-size: 12px" v-if="!isValidPassword">
                            Le mot de passe est invalide
                        </p>
                        <p style="font-size: 12px">
                            Votre mot de passe doit comprendre 6 caractères minimum, dont 1 chiffre et 1 majuscule
                        </p>
                        <!-- Téléphone -->
                        <input type="tel" id="tel" name="tel" placeholder="Téléphone" class="contact__input border"
                            @input="onChangeTel($event)" @change="onChangeTel($event)"
                            pattern="^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$" v-model="telephone" />
                        <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
                            Le numéro de téléphone est invalide
                        </p>
                        <!-- Genre -->
                        <input type="radio" id="masculin" value="MASCULIN" v-model="genre" />
                        <label for="masculin" style="margin-right: 10px; margin-left: 5px"> Masculin</label>

                        <input type="radio" id="feminin" value="FEMININ" v-model="genre" />
                        <label for="feminin" style="margin-left: 5px"> Féminin</label>

                        <p class="text-danger" style="font-size: 12px">
                            {{errorMessage}}
                        </p>

                        <input type="submit" value="Confirmer" name="submit" class="default__btn d-block"
                            v-if="isValidEmail == true && isValidTel == true && isValidPassword == true" /><br />
                        <p>Vous avez déjà un compte ? <router-link to="/authentification">Connectez-vous</router-link>
                        </p>
                    </form>
                    <!-- Message de confirmation -->
                    <div class="form-confirmation mx-auto text-center col-md-5" v-if="testForm === false">
                        <p class="titre mt-3">{{titre}}</p>
                        <p class="text-muted">{{subtitle}}</p>
                        <div class="content__btn mx-auto">
                            <button class="default__btn" @click="goToHome">Continuer</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
    import axios from "axios";
    import constant from "../../constant";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    import md5 from "js-md5";

    export default {
        name: "Inscription",
        components: {
            Loading,
        },
        data() {
            return {
                isValidEmail: true,
                isValidPassword: true,
                isValidTel: true,
                testEmail: false,
                testTel: false,
                nom: "",
                prenom: "",
                email: "",
                password: "",
                telephone: "",
                genre: "",
                regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                regexPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
                titre: "Incription",
                error: "",
                errorMessage: "",
                subtitle: "",
                isLoading: false,
                fullPage: true,
                testForm: true,
            };
        },
        methods: {
            // Retour vers la page précédente
            goBack() {
                this.$router.go(-1); // retourne à la route précédente
            },
            inscription() {
                this.isLoading = true;
                const encryptPassword = this.transformMD5(this.password);
                const dataUsername = this.prenom.charAt(0) + '.' + this.nom;
                // console.log(dataUsername);
                axios
                    .post(constant.apiURL + "auth/patient", {
                        nom: this.nom,
                        prenom: this.prenom,
                        email: this.email,
                        password: encryptPassword,
                        telephone: this.telephone,
                        gender: this.genre,
                        username: dataUsername,
                        profile: 'PATIENT'
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.data.code == 201) {
                            this.testForm = false;
                            this.subtitle = "Votre inscription est finalisée avec succès.\n" + 
                            "Un lien pour activer votre compte a été envoyé à l'adresse : " + this.email;
                            this.isLoading = false;
                        } else {
                            this.error = "Une erreur est survenue, veuillez réessayer plutard";
                            this.isLoading = false;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.error = "Une erreur est survenue, veuillez réessayer plutard";
                        this.isLoading = false;
                    });
            },
            onChangePassword(e) {
                const password = e.target.value;
                this.isPasswordValid(password);
            },
            isPasswordValid: function (inputPassword) {
                this.isValidPassword = this.regexPassword.test(inputPassword);
            },
            onChangeTel(e) {
                const numero = e.target.value;
                this.isTelephoneValid(numero);
            },
            isTelephoneValid: function (inputTel) {
                this.isValidTel = this.regexTelephone.test(inputTel);
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
                return this.isEmailValid && this.isValidPassword && this.isValidTel;
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