<template>
    <div class="tableau-de-bord">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <Patientnav />
        <div class="content section">
            
        </div>
          
        <!-- <Footer /> -->
    </div>

</template>

<script>
    import { mapGetters } from "vuex";
    import Loading from "vue-loading-overlay";
    import Patientnav from "@/components/Patientnav.vue";
    // import Footer from "@/components/Footer.vue";
    export default {
        name: "Tableau-de-bord",
        components: {
            Patientnav,
            // Footer,
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
                this.$router.push("/authentification"); // l'utilisateur n'est pas authentifié, allez vers la page d'authentification
            }
        },
    }
</script>

<style scoped>

</style>