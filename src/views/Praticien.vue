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
                        <Dates />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>

</template>

<script>
    import CryptoJS from 'crypto-js'
    import constant from "../../constant"
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'
    import Dates from '@/components/Dates.vue'

    export default {
        name: "Praticien",
        components: {
            Navbar,
            Footer,
            Dates
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
            user() {
                return this.$store.getters.getMedecinById(this.id);
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
        },
        created() {
            // Récupération d'un médecin à partir de son Id
            const IdStorage = localStorage.getItem('medecinId');

            if (IdStorage !== null) {
                this.id = parseInt(this.decryptData(IdStorage, constant.secretKey));
            } else {
                // Gérer le cas où 'medecinId' n'existe pas dans le localStorage
                this.$router.push('/recherche');
            }
        },
    }
</script>

<style>
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