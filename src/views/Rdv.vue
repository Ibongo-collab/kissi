<template>
    <div class="rdv">
        <div class="banner">
            <div class="content section">
                <button class="arrow" @click="goBack">
                    <i class='bx bx-left-arrow-alt icon'></i>
                </button>
                <!-- Disponibilités sur Brazzaville et Pointe-noire -->
                <div class="info-banner">
                    <div class="row">
                        <div class="col-auto">
                            <img src="../assets/images/user.png" class="rounded-circle border" alt="image medecin"
                                width="80px" height="80px">
                        </div>
                        <div class="col-auto">
                            <p class="nom-praticien titre" style="color: #4f74da; line-height: 30px">Dr {{user.nom}}
                                {{user.prenom}}</p>
                            <p class="specialite-praticien">{{user.categorieMedecin.nom}}</p>
                        </div>
                    </div>

                    <form v-on:submit.prevent="prendreRdv">
                        <div class="form-rdv mx-auto">
                            <p class="sous-titre mt-3">Vérification</p>
                            <p class="mt-2">Votre rendez-vous le : 05/12/2023 à 09:00</p>
                            <select v-model="selected" name="ville" placeholder="Ville" class="contact__input border">
                                <option disabled value="">Veuillez choisir un motif de consultation</option>
                                <option v-for="(item, index) in motifList" :key="index">
                                    {{item.viewValue}}
                                </option>
                            </select>
                            <input id="nom" type="text" name="nom" placeholder="" class="contact__input border"
                                v-model="patient.nom" :disabled="true">
                            <input id="prenom" type="text" name="prenom" placeholder="" class="contact__input border"
                                v-model="patient.prenom" :disabled="true">
                            <input id="tel" type="tel" name="tel" placeholder="" class="contact__input border"
                                v-model="patient.telephone" :disabled="true">
                            <p class="muted">Un code va vous être envoyé sur ce numéro Pour
                                valider votre RDV.</p>
                            <p class="text-muted">
                                En cliquant sur suivant, vous acceptez nos
                                <router-link to="/">Conditions Générales</router-link> et notre
                                <router-link to="/">Politique de Confidentialité</router-link> du site
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
    import CryptoJS from 'crypto-js'
    import constant from "../../constant"
    import {
        mapGetters
    } from "vuex"
    export default {
        name: "Rendez-vous",
        components: {
            // Navbar,
            // Footer
        },
        data() {
            return {
                id: 0,
                selected: "",
                motifList: [{
                        value: '1',
                        viewValue: 'Motif 1'
                    },
                    {
                        value: '2',
                        viewValue: 'Motif 2'
                    },
                    {
                        value: '3',
                        viewValue: 'Motif 3'
                    },
                ],
            }
        },
        computed: {
            ...mapGetters(["patient"]),
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
        },
        created() {
            // Récupération d'un médecin à partir de son Id
            const IdStorage = localStorage.getItem('medecinId');
            this.id = parseInt(this.decryptData(IdStorage, constant.secretKey));
        }
    }
</script>

<style scoped>
    .form-rdv {
        width: 400px;
    }
</style>