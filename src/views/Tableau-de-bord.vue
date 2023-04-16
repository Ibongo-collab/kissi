<template>
    <div class="tableau-de-bord">
        Hello {{user.nom}}
    </div>

</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "Tableau-de-bord",
        components: {
            
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
            ...mapGetters(["user"]),
            isAuthenticated() {
                return this.$store.getters.isAuthenticated; // accéder à la valeur du getters
            },
        },
        mounted() {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push("/"); // l'utilisateur est authentifié, continuez vers la page d'accueil
            }
        },
    }
</script>

<style scoped>

</style>