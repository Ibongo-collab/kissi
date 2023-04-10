<template>
    <div class="profil">
        <Navbar />
        <section class="content" id="monfaq">
            <h2 class="titre">Foire aux questions</h2>
            <div class="accordion-wrapper mt-5">
                <div class="accordion">
                    <input type="radio" name="radio-a" id="check1" class="input" checked>
                    <label class="accordion-label" for="check1">1 - A qui le produit est destiné ?</label>
                    <div class="accordion-content">
                        Le produit est destiné à toute les personnes qui ont besoin d'une cuisson rapide et éfficace.
                        FLC vise les hommes et les femmes qui souhaitent gagner plus de temps lors de la préparation
                        du saka saka connue pour être longue et peinible.
                    </div>
                </div>
                <div class="accordion second">
                    <input type="radio" name="radio-a" class="input" id="check2">
                    <label class="accordion-label" for="check2">2 - En quoi ce produit est différent des produits déjà
                        existants ?</label>
                    <div class="accordion-content">
                        FLC est la toute première entreprise à Pointe-noire à vendre le saka-saka dans les grandes
                        surfaces.
                        Depuis 2014, "Casino", "Park'n'Shop" et maintenant "Nazo's" nous font confiance. De la
                        cueuillette à
                        la livraison, tout est méticuleusement fait afin de garantire aux clients une consommation saine.
                    </div>
                </div>
                <div class="accordion second">
                    <input type="radio" name="radio-a" class="input" id="check3">
                    <label class="accordion-label" for="check3">3 - Quel est le coût de la livraison à domicile ?</label>
                    <div class="accordion-content">
                        Les frais de livraison s'élèvent à 500 FCFA pour les particuliers résidants au centre-ville et aux alentours 
                        et de 1000 FCFA pour ceux qui sont dans les quatiers éloignés. Cependant la livraison est gratuite pour les
                        entreprises.
                    </div>
                </div>
                <div class="accordion second">
                    <input type="radio" name="radio-a" class="input" id="check4">
                    <label class="accordion-label" for="check4">4 - Quels sont les quartiers éloignés éligibles à
                        la livraison à domicile ?</label>
                    <div class="accordion-content">
                        Les quartiers périphériques où nous livrons sont : Côte mateve, Faubourg, Loandjili, Malala, Matende, Mawata, Mongo Kamba, Mongo Mpoukou, Mpaka, Mpatra,
                        Ngoyo, Nkouinkou, Raffinerie, Songolo, Siafoumou, Tchiali, Tchimbamba et Vindoulou
                    </div>
                </div>
                <div class="accordion second">
                    <input type="radio" name="radio-a" class="input" id="check5">
                    <label class="accordion-label" for="check5">5 - Comment serai-je notifié de l'état de ma commande
                        ?</label>
                    <div class="accordion-content">
                        Vous pouvez consulter l'état de votre commmande dans votre espace dédié au niveau de l'onglet
                        <router-link to="/profil">Mon compte</router-link>. Vous serez également notifié par
                        e-mail.
                        Vous recevrez ensuite un appel du livreur si votre commande est prête et est sur le point d'être
                        livrée.
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<script>
    import Navbar from "../components/Navbar.vue";
    import Footer from "../components/Footer.vue";

    export default {
        name: "Faq",
        components: {
            Navbar,
            Footer,
        },
        data() {
            return {

            };
        },
    }
</script>

<style scoped>
    .content {
        margin-top: 130px;
        margin-bottom: 30px;
    }

    .input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

    .accordion-wrapper {
        /* border-radius: 8px; */
        overflow: hidden;
        width: auto;
        margin: 0 auto;
    }

    .accordion {
        width: 100%;
        color: white;
        overflow: hidden;
        margin-bottom: 16px;
    }

    .accordion:last-child {
        margin-bottom: 0;
    }

    .accordion-label {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 16px;
        background: black;
        font-weight: bold;
        cursor: pointer;
        font-size: 20px;
    }

    .accordion-label:hover {
        background: black;
    }

    .accordion-label::after {
        content: "\276F";
        width: 16px;
        height: 16px;
        text-align: center;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    .accordion-content {
        max-height: 0;
        padding: 0 16px;
        color: rgba(4, 57, 94, 1);
        background: white;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    /* .accordion-content p {
        margin: 0;
        color: rgba(4, 57, 94, .7);
        font-size: 18px;
    } */

    input:checked+.accordion-label {
        background: rgb(41, 44, 46);
    }

    input:checked+.accordion-label::after {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    input:checked~.accordion-content {
        max-height: 100vh;
        padding: 16px;
    }

    @media screen and (max-width: 767px) {
        .titre-profil {
            margin-bottom: 100px;
        }

        #monfaq {
            margin-top: 50px;
            margin-bottom: 100px;
        }
    }
</style>