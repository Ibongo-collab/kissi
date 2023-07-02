<template>
    <div class="consultations">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <main class="">
            <div class="content">
                <button class="arrow" style="margin-top: 30px;" @click="goBack">
                    <i class='bx bx-left-arrow-alt icon'></i>
                </button>
                <!-- Disponibilités sur Brazzaville et Pointe-noire -->
                <div class="info-banner">
                    <form v-on:submit.prevent="prendreRdv" v-if="testForm">
                        <div class="form-rdv mx-auto">
                            <div class="row">
                                <div class="col-auto">
                                    <img src="../assets/images/user.png" class="rounded-circle border"
                                        alt="image medecin" width="60px" height="60px">
                                </div>
                                <div class="col-auto">
                                    <p class="nom-praticien sous-titre" style="color: #4f74da; line-height: 20px">Dr
                                        {{user.nom}} {{user.prenom}}</p>
                                    <p class="specialite-praticien">{{user.categorieMedecin.nom}}</p>
                                </div>
                            </div>
                            <p class="mt-2">Votre rendez-vous le : {{date | moment('dddd')}} <span
                                    class="mois">{{date | moment('D MMMM')}}</span>
                                à {{heure}}</p>
                            <select v-model="selected" name="ville" placeholder="Ville" class="contact__input border">
                                <option disabled value="">Veuillez choisir un motif de consultation</option>
                                <option v-for="(item, index) in medecinMotif" :key="index">
                                    {{item.nom}}
                                </option>
                            </select>
                            <input id="nom" type="text" name="nom" placeholder="" class="contact__input border"
                                v-model="patient.nom" :disabled="true">
                            <input id="prenom" type="text" name="prenom" placeholder="" class="contact__input border"
                                v-model="patient.prenom" :disabled="true">
                            <input id="tel" type="tel" name="tel" placeholder="" class="contact__input border"
                                v-model="patient.telephone" :disabled="true">
                            <p class="text-muted">
                                En cliquant sur suivant, vous acceptez nos
                                <router-link to="/">Conditions Générales</router-link> et notre
                                <router-link to="/">Politique de Confidentialité</router-link>
                            </p>
                            <div class="col-auto content-input">
                                <button type="submit" class="default__btn" :disabled="isDisabled">
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </form>
                    <!-- Message de confirmation -->
                    <div class="form-confirmation mx-auto text-center col-md-5" v-if="!testForm">
                        <p class="titre mt-3">{{title}}</p>
                        <p class="text-muted">{{subtitle}}</p>
                        <div class="content__btn mx-auto">
                            <button class="default__btn" @click="goToRecherche">Continuer</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

</template>

<script>
    import axios from "axios"
    import CryptoJS from 'crypto-js'
    import constant from "../../constant"
    import Loading from "vue-loading-overlay"
    import {
        mapGetters
    } from "vuex"

    export default {
        name: "Consultations",
        components: {
            Loading,
        },
        data() {
            return {
                id: 0,
                selected: "",
                date: "",
                heure: "",
                title: "Confirmation",
                subtitle: "Votre demande de rendez-vous a été transférée.\n Vous recevrez un SMS du médecin pour confirmer votre rendez-vous.",
                isLoading: false,
                fullPage: true,
                testForm: true
            }
        },
        computed: {
            ...mapGetters(["patient"]),
            ...mapGetters(["medecinMotif"]),
            ...mapGetters(['token']),
            user() {
                return this.$store.getters.getMedecinById(this.id);
            },
            isDisabled() {
                // contrôle sur l'activation du bouton
                return !this.selected;
            },
        },
        methods: {
            //  Retour vers la page précédente
            goBack() {
                this.$router.go(-1);
            },
            goToRecherche() {
                this.$router.push("/recherche");
            },
            // Fonction pour décrypter les données
            decryptData(data, key) {
                const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
                return decrypted;
            },
            prendreRdv() {
                const token = localStorage.getItem("token");
                this.isLoading = true;

                const requestData = {
                    date: this.date,
                    heure: this.heure,
                    motif: this.selected,
                    finrdv: false,
                    statut: "EN_ATTENTE",
                    medecin: {
                        id: this.id
                    },
                    patient: {
                        id: this.patient.id
                    },
                    lupatient: false,
                    lumedecin: false,
                };

                const requestConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };

                axios.post(constant.apiURL + "rendezvous", requestData, requestConfig)
                    .then((response) => {
                        console.log(response);
                        if (response.data.code === 201) {
                            this.testForm = false;
                        } else if (response.data.code === 400) {
                            alert('Veuillez noter qu\'il semble que vous ayez déjà un rendez-vous en cours' +
                                ' avec ce médecin. Nous vous prions de bien vouloir honorer votre rendez-vous actuel' +
                                ' avant d\'en planifier un autre.');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        created() {
            // Récupération d'un médecin à partir de son Id
            const IdStorage = localStorage.getItem('medecinId');

            if (IdStorage !== null) {
                this.id = parseInt(this.decryptData(IdStorage, constant.secretKey));
                // Récupération de la liste des motifs
                this.$store.dispatch('getMotifMedecin', this.id);

                // Récupération de la date et de l'heure du rendez-vous
                const dateRdv = localStorage.getItem('dateRdv');
                const heureRdv = localStorage.getItem('heureRdv');

                this.date = this.decryptData(dateRdv, constant.secretKey);
                this.heure = this.decryptData(heureRdv, constant.secretKey);
            } else {
                // Gérer le cas où 'medecinId' n'existe pas dans le localStorage
                this.$router.push('/recherche');
            }
        }
    }
</script>

<style scoped>
    .form-rdv {
        width: 400px;
    }

    .mois {
        text-transform: uppercase;
    }
</style>