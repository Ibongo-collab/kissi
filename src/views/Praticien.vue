<template>
    <div class="praticien banner">
        <Navbar />
        <div class="content section">
            <button class="arrow" @click="goToRecherche">
                <i class='bx bx-left-arrow-alt icon'></i>
            </button>
            <div class="row">
                <!-- Informations sur le médecin -->
                <div class="col-md-6">
                    <div class="content-indication">
                        <div class="row">
                            <div class="col-md-2" style="text-align: center;">
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
                            <button class="arrow" @click="prevPage">
                                <i class='bx bx-left-arrow-alt icon'></i>
                            </button>
                            <span class="space"></span>
                            <button class="arrow" @click="nextPage">
                                <i class='bx bx-right-arrow-alt icon'></i>
                            </button>
                        </div>
                        <div id="container-date">
                            <div class="element" v-for="date in currentItems" :key="date.id">
                                <div class="content-items">
                                    <!-- EX LUN  -->
                                    <p class="titre-date-praticien">{{date.date | moment('dddd')}}</p>
                                    <!-- EX 13 avr.  -->
                                    <span class="date-praticien">{{date.date | moment('D MMM')}}</span>

                                    <div class="button" v-for="item in date.heureMedecins" :key="item.id">
                                        <!-- Verification de l'authentification -->
                                        <div v-if="isAuthenticated == false">
                                            <!-- EX 08:00  -->
                                            <button class="horaire__btn" data-bs-toggle="modal"
                                                data-bs-target="#alert">{{item.heure}}</button>
                                                <button class="horaire__btn" data-bs-toggle="modal"
                                                data-bs-target="#alert" v-if="item === '' ">-</button>
                                        </div>
                                        <div v-else>
                                            <!-- EX 08:00  -->
                                            <button class="horaire__btn"
                                                @click="goToRdv(date.date, item.heure)">{{item.heure}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-explain" v-if="currentItems.length == 0">
                                <p>Aucune disponibilité à venir</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />

        <div class="modal fade" id="alert" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-white">
                        <h5 class="modal-title titre-commande text-center" id="exampleModalLabel">
                            Authentification requise
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        Veuillez vous <span class="link" @click="goToAuth"
                            data-bs-dismiss="modal"><b>authentifier</b></span> avant de continuer
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'
    import CryptoJS from 'crypto-js'
    import constant from "../../constant"
    import {
        mapGetters
    } from "vuex"
    import axios from 'axios'

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
                isReloading: false,
                hourList: [],
                rdvList: [],
                medecinDateFiltered: [],
                newMedecinDate: [],
                pageSize: 4, // Nombre d'éléments par page
                currentPage: 1, // Page courante
                currentDate: null
            }
        },
        computed: {
            ...mapGetters(["medecinDate"]),
            user() {
                return this.$store.getters.getMedecinById(this.id);
            },
            currentItems() {
                const startIndex = (this.currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;
                return this.newMedecinDate.slice(startIndex, endIndex);
            },
            // accéder à la valeur du getters
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
        },
        methods: {
            goToRecherche() {
                this.$router.push("/recherche");
            },
            goToAuth() {
                localStorage.setItem('rdvContinue', true);
                this.$router.push('/authentification');
            },
            goToRdv(date, heure) {
                const token = localStorage.getItem('token');
                /* Je suis en train de vérifier si la date et l'heure 
                sélectionnées sont déjà réservées pour un rendez-vous. */
                axios.post(constant.apiURL + 'medecins/' + this.id + '/rendezvous', {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        // console.log(response);
                        this.rdvList = response.data.content;
                        let rdvFound = false; // Variable pour vérifier si un rdv a été trouvé

                        this.rdvList.forEach((element) => {
                            if (element.date == date) {
                                // console.log(element.date + "=" + date);
                                if (element.heure == heure) {
                                    // console.log(element.heure + "=" + heure);
                                    /* Si la date et l'heure sélectionnées correspondent à un rdv, alors j'affiche une alerte */
                                    alert("L'heure que vous avez sélectionnée a déjà été réservée pour un rendez-vous");
                                    rdvFound = true;
                                }
                            }
                        });

                        if (!rdvFound) {
                            const dateRdv = this.encryptData(date, constant.secretKey);
                            const heureRdv = this.encryptData(heure, constant.secretKey);

                            localStorage.setItem('dateRdv', dateRdv);
                            localStorage.setItem('heureRdv', heureRdv);
                            
                            this.$router.push('/rdv');
                        }

                    }).catch((error) => {
                        console.log(error);
                    });
            },
            getTel() {
                if (this.test === true) {
                    this.message = this.user.telephone;
                    this.test = false;
                } else {
                    this.message = "Afficher le numéro";
                    this.test = true;
                }
            },
            // Fonction pour crypter les données
            encryptData(data, key) {
                const encrypted = CryptoJS.AES.encrypt(data, key).toString()
                return encrypted
            },
            // Fonction pour décrypter les données
            decryptData(data, key) {
                const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
                return decrypted;
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            nextPage() {
                const maxPage = Math.ceil(this.medecinDate.length / this.pageSize);
                if (this.currentPage < maxPage) {
                    this.currentPage++;
                }
            },
            process() {
                // Récuprération de la date courante
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const day = currentDate.getDate().toString().padStart(2, '0');
                this.currentDate = `${year}-${month}-${day}`; //2023-06-4

                // Récupération de l'heure courante
                function getCurrentTime() {
                    const date = new Date();
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const currentTime = `${hours}:${minutes}`; // 11:00

                    return currentTime;
                }
                const currentTime = getCurrentTime();

                // Créer une nouvelle liste filtrée
                this.medecinDateFiltered = this.medecinDate.filter(item => {
                    return item.date >= this.currentDate;
                });

                this.newMedecinDate = this.medecinDateFiltered.filter(item => {
                    if (item.date === this.currentDate) {
                        return item.heureMedecins = item.heureMedecins.filter(item => item.heure >= currentTime);
                    } else {
                        // Garder les éléments qui ne correspondent pas à la date actuelle
                        return true;
                    }
                });
            },
            reloadPage() {
                location.reload();
            },
        },
        created() {
            // Récupération d'un médecin à partir de son Id
            const IdStorage = localStorage.getItem('medecinId');

            if (IdStorage !== null) {
                this.id = parseInt(this.decryptData(IdStorage, constant.secretKey));
                // Récupération de la liste des dates du médecin
                this.$store.dispatch('getDateMedecin', this.id);
                this.process();
            } else {
                // Gérer le cas où 'medecinId' n'existe pas dans le localStorage
                this.$router.push('/recherche');
            }
        },
    }
</script>

<style scoped>
    .link {
        text-decoration: underline;
        color: #4f74da;
        cursor: pointer;
    }

    .space {
        width: 10px;
    }

    .arrow-direction {
        margin: 2.5%;
    }

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

    .content-explain {
        padding: 5%;
        width: 100%;
        text-align: center;
        background-color: rgb(201, 201, 201);
    }

    .titre-date-praticien {
        width: 3ch;
        font-family: monospace;
        text-transform: uppercase;
        margin-left: 1.2rem;
    }
</style>