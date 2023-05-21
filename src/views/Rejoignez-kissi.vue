<template>
    <div class="home">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <Navbar />

        <main>
            <!--=============== TOP ===============-->
            <div class="banner">
                <div class="content" id="home">
                    <div class="row content-bloc">
                        <div class="col-md-6 text-bloc">
                            <h2 class="grand-titre">Une solution <span style="color: #4f74da">appréciée</span> par vos
                                confrères</h2>
                            <p class="description">
                                Kissi a été pensé pour faciliter le suivi de vos patients, mais aussi pour améliorer la
                                qualité des consultations, donc de proposer une meilleure expérience.
                                Nous offrons une solution en ligne donc accessible dans tout votre territoire.
                                Vous souhaitez essayer la solution ? Remplissez le formulaire afin d'être contacter par
                                un membre de notre équipe pour une démonstration gratuite.
                            </p>
                        </div>
                        <div class="col-md-6 form-bloc">
                            <!-- Formulaire de demande de démo -->
                            <form v-on:submit.prevent="demo" class="mx-auto">
                                <input type="text" id="nom" name="nom" placeholder="Nom*" class="contact__input border"
                                    required v-model="nom" />

                                <input type="tel" id="tel" name="tel" placeholder="numéro de téléphone*"
                                    class="contact__input border" @change="onChangeTel($event)"
                                    @input="onChangeTel($event)" pattern="^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$"
                                    required v-model="telephone" />
                                <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
                                    Le numéro de téléphone est invalide
                                </p>

                                <input type="email" id="email" class="contact__input border"
                                    @input="onChangeEmail($event)" @change="onChangeEmail($event)" placeholder="Email*"
                                    v-model="email" />

                                <p class="text-danger" style="font-size: 12px" v-if="!isEmailValid">L'email est invalide
                                </p>

                                <input type="text" id="spe" name="specialite" placeholder="Spécialité*"
                                    class="contact__input border" required v-model="specialite" />

                                <input type="submit" value="J'envoie ma demande" name="submit"
                                    class="default__btn d-block" :disabled="isDisabled" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!--==================== CONSULTATION AVEC KISSI ====================-->
            <div class="content section">
                <h2 class="titre">Comment fonctionne la consultation avec Kissi</h2>
                <div id="conteneur">
                    <div class="element">
                        <div class="content-icon">
                            <i class='bx bxs-pointer icon'></i>
                        </div>
                        <div class="content-text">
                            <p class="sous-titre"><b>
                                    Choisissez vos créneaux horaires</b></p>
                            <p>Kissi permet au médecin d'éviter de fouiller dans sa paperasse. Vous avez donc accès aux
                                documents médicaux que vous avez effectués en un dossier pour chaque patient.</p>
                        </div>
                    </div>
                    <div class="element">
                        <div class="content-icon">
                            <i class='bx bxs-calendar icon'></i>
                        </div>
                        <div class="content-text">
                            <p class="sous-titre"><b>Accedez à la liste des rendez-vous</b></p>
                            <p>Sur Kissi, vous pouvez visualiser la liste de rendez-vous en fonction du motif et la
                                date. En même temps, vous pouvez acceder au dossier du patient.</p>
                        </div>
                    </div>
                    <div class="element">
                        <div class="content-icon">
                            <i class='bx bxs-user-rectangle icon'></i>
                        </div>
                        <div class="content-text">
                            <p class="sous-titre"><b>
                                    Retrouvez les documents médicaux</b></p>
                            <p>Kissi permet au médecin d'éviter de fouiller dans sa paperasse. Vous avez donc accès aux
                                documents médicaux que vous avez effectués en un dossier pour chaque patient.</p>
                        </div>
                    </div>
                </div>

                <div class="box-content-business">
                    <img src="../assets/images/banner-medecin-1.png" alt="banner" class="image-banner">
                    <div class="top-left box-business">
                        <h2 class="grand-titre"><b>Equipe médicale</b></h2>
                        <p class="description">
                            La Direction Médicale assure la validité du recrutement, 
                            la formation ainsi que l'encadrement médical continu des professionnels de 
                            santé et de leur pratique de la téléconsultation.
                        </p>
                        <div class="content__btn">
                            <button class="default__btn">Equipe médicale</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--=============== Besoin D'aide ===============-->
            <div class="banner">
                <div class="content section">
                    <!-- <h2 class="grand-titre mb-3">Besoin d'aide ?</h2> -->
                    <h3 class="titre mb-3">Questions les plus fréquentes</h3>
                    <div id="conteneur">
                        <div class="element-aide">
                            <p class="aide">Tarifs</p>
                            <div class="content-text">
                                <p class="sous-titre"><b>Quel est le coût de la solution Kissi ?</b></p>
                                <p>Un contrat avec un abonnement sans engagement à 27500 Fcfa par mois vous est proposé.</p>
                            </div>
                        </div>
                        <div class="element-aide">
                            <p class="aide">Installation</p>
                            <div class="content-text">
                                <p class="sous-titre"><b>L'installation de la solution est-elle simple ?</b></p>
                                <p>Votre ordinateuret et une bonne connexion internet fiable suffisent. 
                                Tout se déroule en ligne : inscription sur kissi, formation, premières consultations, mises à jour automatiques...</p>
                            </div>
                        </div>
                        <div class="element-aide">
                            <p class="aide">Sécurité</p>
                            <div class="content-text">
                                <p class="sous-titre"><b>Comment Kissi gère la sécurisation des données ?</b></p>
                                <p>La sécurisation des données est une priorité absolue chez Qare. Les données de vos patients
                                sont sécurisées. Les échanges vidéo sont cryptés et les données sont stockées chez un hébergeur agréé données de santé.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <Footer />
    </div>
</template>


<script>
    // @ is an alias to /src
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'
    import Loading from "vue-loading-overlay";
export default {
    name: 'Rejoingnez-kissi',
    components: {
        Navbar,
        Footer,
        Loading
    },
    data() {
        return {
            emailTest: false,
            isValidEmail: true,
            isValidTel: true,
            testEmail: false,
            testTel: false,
            email: "",
            telephone: "",
            regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
            error: "",
            isLoading: false,
            fullPage: true,
            specialite: "",
        }
    },
    methods: {
        goToRoot() {
            this.$router.push("/Rejoignez-kissi");
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
    },
    computed: {
    },
    created() {

    },
    mounted() {
    }
} 
</script>

<style scoped>

  .text-bloc {
    margin-top: 100px;
  }

.aide {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 25px;
    color: #4f74da;
}

.element-aide {
    padding: 2%;
    width: 300px;
    height: auto;
    padding-bottom: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: white;
}

.image-banner {
    border-radius: 10px;
}

.content {
    padding-top: 70px;
}

.content-icon {
    margin-top: 25px;
}

.icon {
    margin-bottom: 30px;
    font-size: 40px;
}

.content-bloc {
    padding-bottom: 70px;
}

.description {
    margin-bottom: 25px;
    text-align: justify;
    width: 400px;
}

.titre-mission,
.titre-partenaires,
.titre-faq {
    font-size: 30px;
    font-weight: 900;
}

.description-mission {
    font-size: 15px;
}

.form-bloc {
    margin-top: 160px;
}

.element {
    width: 250px;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.element-special {
    width: 500px;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border: 1px solid black;
}

#conteneur {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: auto;
    height: auto;
}

.k__container,
.partenaire_container {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.bd-grid {
    display: grid;
    gap: 1.5rem;
}

.text-element {
    font-size: 20px;
    font-weight: 900;
    color: rgb(104, 103, 103);
}

.element-partenaire-right {
    width: auto;
    height: auto;
    text-align: right;
}

.element-partenaire {
    width: auto;
    height: auto;
}

.image {
    filter: grayscale(100%);
}

.image:hover {
    filter: grayscale(0%);
}

/* ====== Accordeon ====== */

.input {
    position: absolute;
    opacity: 0;
    z-index: -1;
}

.accordion-wrapper {
    overflow: hidden;
    width: auto;
    margin: 0 auto;
}

.accordion {
    width: 100%;
    color: black;
    overflow: hidden;
    margin-bottom: 16px;
}

.accordion:last-child {
    margin-bottom: 0;
}

.accordion-label {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 16px;
    background: white;
    border-bottom: 1px solid black;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
}

.accordion-label::after {
    content: "\276F";
    width: 16px;
    height: 16px;
    text-align: center;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}

.accordion-content {
    max-height: 0;
    padding: 0 16px;
    background: white;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    font-size: 14px;
}

input:checked+.accordion-label {
    background: #EFEFEF;
}

input:checked+.accordion-label::after {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}

input:checked~.accordion-content {
    max-height: 100vh;
    padding: 16px;
}

/*========== NAZO'S BUSINESS ==========*/

.image-business {
    width: 100%;
}

.titre-business {
    font-size: 30px;
    color: #fff;
}

.text-business {
    text-align: justify;
    font-size: 13px;
    color: #fff;
}

.top-left {
    position: relative;
    top: -268px;
    left: 16px;
}

.box-business {
    text-align: initial;
    width: 50%;
    top: -360px;
}

.box-business-two {
    text-align: center;
    width: 100%;
}

.sub-box-business-two {
    background-color: rgb(46, 46, 46);
    padding: 1rem;
}

.titre-business-two,
.text-business-two {
    color: white;
    font-weight: 600;
}

.box-content-business {
    margin: 0;
    padding: 0;
    height: 500px;
}

.button-business-two {
    font-family: "BasisGrotesque";
    color: #f7b655;
    padding: 0.8rem 1.3rem;
    background-color: #fff;
    border: rgb(46, 46, 46);
    margin-right: 0px;
    transition: 0.5s;
    font-size: 14px;
}

@media screen and (max-width: 767px) {
    .titre-profil {
        margin-bottom: 100px;
    }

    #monfaq {
        margin-top: 50px;
        margin-bottom: 100px;
    }
}


/* lorsque l'écran est inférieur à 992px */
@media (max-width: 992px) {
    .titre-business {
        font-size: 35px;
    }

    .text-business {
        font-size: 13px;
    }
}

@media (max-width: 840px) {
    .titre-business {
        font-size: 28px;
    }
}

@media (max-width: 767px) {
    .text-business {
        font-size: 12px;
    }
}

@media (max-width: 672px) {
    .titre-business {
        font-size: 25px;
    }

    .text-business {
        font-size: 12px;
    }
}

@media (max-width: 654px) {
    .box-content-business {
        display: none;
    }
}

@media (min-width: 654px) {
    .box-content-business-two {
        display: none;
    }
}

</style>