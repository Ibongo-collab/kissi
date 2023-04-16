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
                    <div class="row">
                        <div class="col-md-2" style="text-align: center; ">
                            <img src="../assets/images/user.png" class="rounded-circle border" alt="image medecin"
                                width="50px" height="50px">
                        </div>
                        <div class="col-md-10">
                            <p class="nom-praticien">Dr {{nom}}</p>
                            <p class="specialite-praticien">Médecin Généraliste</p>
                        </div>
                    </div>
                    <div class="info-medecin">
                        <h3 class="sous-titre">Indications</h3>
                        <div class="content-indication border">
                            <h3 class="titre-indication">Ville</h3>
                            <p class="description-indication">Pointe-noire</p>
                            <h3 class="titre-indication">Téléphone</h3>
                            <p class="description-indication">+242 06 846 0206</p>
                            <h3 class="titre-indication">Tarif</h3>
                            <p class="description-indication">10.000 Fcfa</p>
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
                            <div class="element">
                                <p class="titre-date-praticien">Lundi</p>
                                <span class="date-praticien">10/04</span>
                                <button class="horaire__btn">09:00</button>
                                <button class="horaire__btn">09:30</button>
                                <button class="horaire__btn">10:00</button>
                                <button class="horaire__btn">10:30</button>
                                <button class="horaire__btn">11:00</button>
                                <button class="horaire__btn">11:30</button>
                                <button class="horaire__btn">12:00</button>
                                <button class="horaire__btn">12:30</button>
                                <button class="horaire__btn">13:00</button>
                            </div>
                            <div class="element">
                                <p class="titre-date-praticien">Mardi</p>
                                <span class="date-praticien">11/04</span>
                                <button class="horaire__btn">09:00</button>
                                <button class="horaire__btn">09:30</button>
                                <button class="horaire__btn">10:00</button>
                                <button class="horaire__btn">10:30</button>
                                <button class="horaire__btn">11:00</button>
                                <button class="horaire__btn">11:30</button>
                            </div>
                            <div class="element">
                                <p class="titre-date-praticien">Mercredi</p>
                                <span class="date-praticien">11/04</span>
                                <button class="horaire__btn">09:00</button>
                                <button class="horaire__btn">09:30</button>
                                <button class="horaire__btn">10:00</button>
                                <button class="horaire__btn">10:30</button>
                                <button class="horaire__btn">11:00</button>
                                <button class="horaire__btn">11:30</button>
                            </div>
                            <div class="element">
                                <p class="titre-date-praticien">Jeudi</p>
                                <span class="date-praticien">11/04</span>
                                <button class="horaire__btn">09:00</button>
                                <button class="horaire__btn">09:30</button>
                                <button class="horaire__btn">10:00</button>
                                <button class="horaire__btn">10:30</button>
                                <button class="horaire__btn">11:00</button>
                                <button class="horaire__btn">11:30</button>
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

    export default {
        name: "Praticien",
        components: {
            Navbar,
            Footer
        },
        data() {
            return {
                nom:"Dervan TATI",
            }
        },
        computed: {
        },
        methods: {

            goToRecherche() {
                this.$router.push("/recherche");
            }
        },
        mounted() {

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
        justify-content: center;
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
</style>