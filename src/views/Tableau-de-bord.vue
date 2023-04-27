<template>
    <div class="tableau-de-bord">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <Navbar />
            Hello {{patient.nom}}
        <Footer />
    </div>

</template>

<script>
    import { mapGetters } from "vuex";
    import Loading from "vue-loading-overlay";
    import Navbar from "@/components/Navbar.vue";
    import Footer from "@/components/Footer.vue";
    export default {
        name: "Tableau-de-bord",
        components: {
            Navbar,
            Footer,
            Loading,
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                isconnected: false,
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                // redirect to the login page
            },
        },
        computed: {
            ...mapGetters(["patient"]),
            isAuthenticated() {
                return this.$store.getters.isAuthenticated; // accéder à la valeur du getters
            },
        },
        mounted() {
            if (this.$store.getters.isAuthenticated === false) {
                this.$router.push("/authentification"); // l'utilisateur est authentifié, continuez vers la page d'accueil
            }
        },
    }
</script>

<style scoped>

</style>