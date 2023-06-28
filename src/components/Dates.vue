<template>
    <div class="dates">
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
                        </div>
                        <div v-else>
                            <!-- EX 08:00  -->
                            <button class="horaire__btn" @click="goToRdv(date.date, item.heure)">{{item.heure}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-explain" v-if="currentItems.length == 0">
                <p>Aucune disponibilité à venir</p>
            </div>
        </div>
    </div>
</template>

<script>
    import constant from "../../constant"
    import {
        mapGetters
    } from "vuex"
    import CryptoJS from 'crypto-js'
    import axios from 'axios'

    export default {
        name: "Dates",
        components: {},
        data() {
            return {
                id: 0,
                message: "Afficher le numéro",
                test: true,
                isReloading: false,
                hourList: [],
                rdvList: [],
                medecinDateFiltered: [],
                pageSize: 4, // Nombre d'éléments par page
                currentPage: 1, // Page courante
                currentDate: null
            }
        },
        computed: {
            ...mapGetters(["medecinDate"]),
            // accéder à la valeur du getters
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            currentItems() {
                const startIndex = (this.currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;
                return this.medecinDateFiltered.slice(startIndex, endIndex);
            },
        },
        methods: {
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
                    return item.date >= this.currentDate || (item.date === this.currentDate && item.heure >= currentTime);
                });
                // this.medecinDateFiltered = this.medecinDate.filter(item => {
                //     return item.date >= this.currentDate;
                // });

                // this.newMedecinDate = this.medecinDateFiltered.filter(item => {
                //     if (item.date === this.currentDate) {
                //         return item.heureMedecins = item.heureMedecins.filter(item => item.heure >=
                //         currentTime);
                //     } else {
                //         // Garder les éléments qui ne correspondent pas à la date actuelle
                //         return true;
                //     }
                // });
                // Mettre à jour la liste dans le store Vuex
                this.$store.commit('SET_MEDECINDATE', this.medecinDateFiltered);
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
                                    alert(
                                        "L'heure que vous avez sélectionnée a déjà été réservée pour un rendez-vous");
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