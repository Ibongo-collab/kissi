<template>
    <div class="rdv">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <div class="banner">
            <div class="content section">
                <button class="arrow" @click="goBack">
                    <i class='bx bx-left-arrow-alt icon'></i>
                </button>
                <!-- Disponibilités sur Brazzaville et Pointe-noire -->
                <div class="info-banner">
                    <form v-on:submit.prevent="prendreRdv">
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
                                <button class="default__btn" :disabled="isDisabled" @click="prendreRdv()">
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    // import Navbar from '@/components/Navbar.vue'
    // import Footer from '@/components/Footer.vue'
    import axios from "axios";
    import Swal from "sweetalert2";
    import CryptoJS from 'crypto-js'
    import constant from "../../constant"
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    import {
        mapGetters
    } from "vuex"
    export default {
        name: "Rendez-vous",
        components: {
            // Navbar,
            // Footer,
            Loading,
        },
        data() {
            return {
                id: 0,
                selected: "",
                date: "",
                heure: "",
                isLoading: false,
                fullPage: true,
            }
        },
        computed: {
            ...mapGetters(["patient"]),
            ...mapGetters(["medecinMotif"]),
            ...mapGetters(['token']),
            user() {
                return this.$store.getters.getMedecinById(this.id)
            },
            isDisabled() {
                // contrôle sur l'activation du bouton
                return !this.selected;
            },
        },
        methods: {
            // Retour vers la page précédente
            goBack() {
                this.$router.go(-1); // retourne à la route précédente
            },
            // Fonction pour décrypter les données
            decryptData(data, key) {
                const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
                return decrypted
            },
            prendreRdv() {
                const token = localStorage.getItem("token");
                this.isLoading = true;
                axios
                    .post(constant.apiURL + "rendezvous", {
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
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    .then((response) => {
                        // console.log(response);
                        this.isLoading = false;
                        if (response.data.code === 201) {
                            Swal.fire({
                            icon: "success",
                                title: "Votre demande de rendez-vous a été transférée."
                                + " Vous recevrez un sms du medecin pour la validation de vorte RDV.",
                                showConfirmButton: true,
                            });
                        } else {
                            Swal.fire({
                            icon: "warning",
                                title: response.data.message,
                                showConfirmButton: true,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.isLoading = false;
                    });

            },
        },
        created() {
            // Récupération d'un médecin à partir de son Id
            const IdStorage = localStorage.getItem('medecinId');
            this.id = parseInt(this.decryptData(IdStorage, constant.secretKey));

            // Récupération de la date et de l'heure du rendez-vous
            this.date = localStorage.getItem('dateRdv');
            this.heure = localStorage.getItem('heureRdv');

            // Récupération de la liste des motifs
            this.$store.dispatch('getMotifMedecin', this.id);
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