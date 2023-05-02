<template>
    <div class="praticien banner">
        <Navbar />
        <div class="content section">
            <div class="arrow" @click="goToRecherche">
                <i class='bx bx-left-arrow-alt icon'></i>
            </div>
            <div class="row">
                <!-- Informations sur le médecin -->
                <div class="col-md-6">
                    <div class="content-indication">
                        <div class="row">
                            <div class="col-md-2" style="text-align: center; ">
                                <img src="../assets/images/user.png" class="rounded-circle border" alt="image medecin"
                                    width="50px" height="50px">
                            </div>
                            <div class="col-md-10">
                                <p class="nom-praticien">Dr {{user.nom}} {{user.prenom}}</p>
                                <p class="specialite-praticien">{{user.categorieMedecin.nom}}</p>
                            </div>
                        </div>
                        <div class="info-medecin">
                            <h3 class="sous-titre">Informations de contact</h3>
                            <h3 class="titre-indication mb-2">Téléphone</h3>
                            <div class="content__btn">
                                <button class="horaire__btn mb-3" @click="getTel">{{message}}</button>
                            </div>

                            <h3 class="titre-indication">Adresse</h3>
                            <p class="">{{user.hopital.adresse}} - {{user.hopital.ville}}</p>

                            <h3 class="titre-indication">Tarif</h3>
                            <p class="description-indication">{{user.tarif}} Fcfa</p>
                        </div>
                        <div class="info-medecin">
                            <h3 class="sous-titre">Présentation</h3>
                            <h3 class="titre-indication">Spécialité</h3>
                            <p class="description-indication">{{user.categorieMedecin.nom}}</p>
                            <h3 class="titre-indication">Qualification professionnelle</h3>
                            <p class="">{{user.description}}</p>
                        </div>
                    </div>


                </div>
                <!-- Affichage des horaires -->
                <div class="col-md-6">
                    <div class="carte-horaire">
                        <div class="row content-arrow">
                            <div class="col-md-6 arrow">
                                <i class='bx bx-left-arrow-alt icon'></i>
                            </div>
                            <div class="col-2 arrow">
                                <i class='bx bx-right-arrow-alt icon'></i>
                            </div>
                        </div>
                        <div id="container-date">
                            <div class="element" v-for="date in medecinDate" :key="date.id">
                                <p class="titre-date-praticien">{{date.date | moment('dddd')}}</p>
                                <span class="date-praticien">{{date.date | moment('D MMM')}}</span>
                                <div class="button" v-for="item in date.heureMedecins" :key="item.id">
                                    <button class="horaire__btn">{{item.heure}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>

</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'
    import CryptoJS from 'crypto-js'
    import constant from "../../constant"
    import { mapGetters } from "vuex"

    export default {
        name: "Praticien",
        components: {
            Navbar,
            Footer
        },
        data() {
            return {
                id: 0,
                message: "Afficher le numéro",
                test: true,
                // hourList: [],
            }
        },
        computed: {
            user () {
                return this.$store.getters.getMedecinById(this.id)
            },
            ...mapGetters(["medecinDate"]),
        },
        methods: {
            goToRecherche() {
                this.$router.push("/recherche");
            },
            getTel() {
                if (this.test === true) {
                    this.message = this.user.telephone;
                    this.test = false
                } else {
                    this.message = "Afficher le numéro";
                    this.test = true
                }
            },
            // Fonction pour décrypter les données
            decryptData(data, key) {
                const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
                return decrypted
            },
        },
        created() {
            const IdStorage = localStorage.getItem('medecinId');
            // console.log(IdStorage);
            this.id = parseInt(this.decryptData(IdStorage, constant.secretKey));
            // console.log(this.id);
            this.$store.dispatch('getDateMedecin', this.id);
            // this.hourList = this.medecinDate.heureMedecins;
            // console.log(this.hourList)
        },
    }
</script>

<style scoped>

    .content-arrow {
        width: 100%;
        height: auto;
        justify-content: center;
    }

    .info-medecin {
        margin-top: 30px;
    }

    .content-indication {
        border-radius: 20px;
        padding: 32px;
        background-color: rgb(255, 255, 255);
    }

    #container-date {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: auto;
        width: auto;
    }

    .element {
        text-align: center;
        height: auto;
        width: auto;
        margin: 15px;
        /* border: 1px solid black; */
    }

    .carte-horaire {
        box-shadow: rgba(0, 0, 0, 0.1) 10px 10px 30px;
        transition: box-shadow 0.2s ease 0s;
        background-color: rgb(255, 255, 255);
        padding: 32px;
        border-radius: 20px;
    }

    .horaire__btn {
        margin-bottom: 15px;
    }

    .col-md-6 {
        height: auto;
    }

    .titre-date-praticien {
        width: 3ch;
        font-family: monospace;
        text-transform: uppercase;
        margin-left: 1.2rem;
    }
</style>