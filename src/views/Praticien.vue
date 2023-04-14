<template>
    <div class="praticien">
        <!-- <Navbar /> -->
        <div class="content section">
            <div class="arrow-back border" @click="goToRecherche">
                <i class='bx bx-left-arrow-alt icon'></i>
            </div>
            <div class="row">
                <div class="col-md-6 bloc-medecin border">
                    <div class="info-banner">
                        <div class="content-photo">
                            <div>
                                <img src="../assets/images/user.png" class="rounded-circle border" alt="image medecin"
                                width="50px" height="50px">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 bloc-horaire-medecin border">

                </div>
            </div>
        </div>

        <Footer />
    </div>

</template>

<script>
//   import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'

    export default {
        name: "Praticien",
        components: {
            // Navbar,
            Footer
        },
        data() {
            return {
                nom:"Dervan TATI"
            }
        },
        methods: {
            goToRecherche() {
                this.$router.push("/recherche");
            }
        }
    }
</script>

<style scoped>
    .icon {
        font-weight: 900;
        font-size: 30px;
    }

    .arrow-back {
        width: 50px;
        cursor: pointer;
        text-align: center;
        border-radius: 10px;
        margin-bottom: 30px;
    }
</style>