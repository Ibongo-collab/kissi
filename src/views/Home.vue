<template>
  <div class="home">

    <Navbar />

    <main>
      <!--=============== HOME ===============-->
      <div class="banner">
        <div class="content" id="home">
          <div class="row">
            <div class="col-md-8 text-bloc">
              <h2 class="grand-titre"><span style="color: #4f74da">+</span> Que prendre des rendez-vous</h2>
              <p class="description">
                Kissi vous propose une expérience unique. Prenez rendez-vous avec votre médecin en ligne 7j/7 de 6h à 00h
              </p>
              <div class="content__btn">
                <button type="button" @click="goToRecherche" class="default__btn">Prendre un rendez-vous</button>
              </div>
            </div>
            <div class="col-md-4">
              <img src="../assets/images/preview.png" alt="image saka-saka" class="product-image mb-3">
            </div>
          </div>
        </div>
      </div>

      <!--==================== PATIENT ====================-->
      <div class="content section" id="recette">
          <h2 class="titre">
            Je suis un patient, comment ça marche ?<br>
          </h2>
          <div class="k__container bd-grid">
            <div class="element">
              <div class="rounded-circle banner" style="margin-bottom: 20px; width: 200px; height: 200px; text-align: center;">
                <img src="../assets/images/computer.png" alt="image" style="margin-top: 25px;">
              </div>
                <p class="sous-titre"><b>Je trouve mon medecin et
                    je prends rendez-vous</b></p>
                <p>Trouvez votre medecin et prenez un rendez-vous en fonction de sa
                  ville et de sa spécialité</p>
            </div>
            <div class="element">
              <div class="rounded-circle banner" style="margin-bottom: 20px; width: 200px; height: 200px; text-align: center;">
                <img src="../assets/images/waiting-room.png" alt="image" style="margin-top: 25px;">
              </div>
                <p class="sous-titre"><b>J'effectue ma consultation
                    le jour venu.</b></p>
                <p>Effectuez votre consultation au sein du centre
                  hospitalier</p>
            </div>
            <div class="element">
              <div class="rounded-circle banner" style="margin-bottom: 20px; width: 200px; height: 200px; text-align: center;">
                <img src="../assets/images/laptop.png" alt="image" style="margin-top: 35px;">
              </div>
                <p class="sous-titre"><b>Je retrouve mes documents
                    médicaux</b></p>
                <p>Bénéficiez de documents médicaux valables en pharmacie, accessibles en ligne depuis votre espace personnel.</p>
            </div>
          </div>
      </div>

      <!--=============== PRATICIEN ===============-->
      <section class="content mb-5" id="banner" style="padding: 4.5rem 0 2rem;">
        <div class="row">
          <div class="col-md-5 pt-5">
            <h2 class="titre">Vous êtes praticien ?</h2>

            <p>Rejoignez DabaDoc et gagnez sur tous les plans!
              Un cabinet plus visible
              Davantage de flux grâce à la prise de RDV 24/24
              Des confirmations et rappels de RDV par SMS envoyés à tous vos patients
              Accès illimité à la vidéo consultation</p>
            <div class="content__btn">
                <button type="button" @click="goToPraticien" class="default__btn">En savoir plus</button>
            </div>
          </div>
          <div class="col-md-6">
            <iframe width="550" height="335" src="https://www.youtube.com/embed/0_gw0hbZpOM" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </section>


      <!--==================== PARTENAIRES ====================-->
      <div class="banner">
        <div class="content" id="">
          <h2 class="titre">Kissi dans la presse</h2>

          <div class="k__container bd-grid pb-5">
            <div class="element-partenaire">
              <img src="../assets/images/dbrazza.jpg" alt="image" class="image">
            </div>
            <div class="element">
              <img src="../assets/images/dbrazza.jpg" alt="image" class="image">
            </div>
            <div class="element-partenaire-right">
              <img src="../assets/images/dbrazza.jpg" alt="image" class="image">
            </div>
          </div>
        </div>
      </div>

      <!--==================== FAQ ====================-->
      <section class="content section" id="faq">
        <h2 class="titre">Questions fréquentes</h2>
        <div class="accordion-wrapper">
          <div class="accordion">
            <input type="radio" name="radio-a" id="check1" class="input" checked>
            <label class="accordion-label" for="check1">Neque porro quisquam est qui dolorem ipsum quia ?</label>
            <div class="accordion-content">
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
              </p>
            </div>
          </div>
          <div class="accordion deux">
            <input type="radio" name="radio-a" class="input" id="check2">
            <label class="accordion-label" for="check2">Neque porro quisquam est qui dolorem ipsum qui ?</label>
            <div class="accordion-content">
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
              </p>
            </div>
          </div>
          <div class="accordion trois">
            <input type="radio" name="radio-a" class="input" id="check3">
            <label class="accordion-label" for="check3">Neque porro quisquam est qui dolorem ipsum quia ?</label>
            <div class="accordion-content">
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
              </p>
            </div>
          </div>
          <div class="accordion quatre">
            <input type="radio" name="radio-a" class="input" id="check4">
            <label class="accordion-label" for="check4">Neque porro quisquam est qui dolorem ipsum quia ?</label>
            <div class="accordion-content">
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
              </p>
            </div>
          </div>
          <div class="accordion cinq">
            <input type="radio" name="radio-a" class="input" id="check5">
            <label class="accordion-label" for="check5">Neque porro quisquam est qui dolorem ipsum quia ?</label>
            <div class="accordion-content">
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <Footer />
  </div>
</template>


<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'
  import {
    gsap
  } from "gsap";
  // import { mapGetters } from "vuex";

  export default {
    name: 'Home',
    components: {
      Navbar,
      Footer
    },
    data() {
      return {

      }
    },
    methods: {
      goToRecherche() {
        this.$router.push("/recherche");
      },
      goToPraticien() {
        this.$router.push("/rejoignez-kissi");
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
      gsap.from('.product-image', {
        opacity: 0,
        duration: 2,
        delay: 1.2,
        y: -40
      });
    }
  }
</script>

<style scoped>

  .content {
    padding-top: 70px;
  }

  .description {
    margin-bottom: 25px;
    text-align: justify;
    width: 400px;
  }

  .titre-mission,
  .titre-partenaires,
  .titre-faq {
    font-size: 30px;
    font-weight: 900;
  }

  .description-mission {
    font-size: 15px;
  }

  #conteneur {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .k__container,
  .partenaire_container {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .bd-grid {
    display: grid;
    gap: 1.5rem;
  }

  .text-element {
    font-size: 20px;
    font-weight: 900;
    color: rgb(104, 103, 103);
  }

  .element {
    width: auto;
    height: auto;
  }

  .element-partenaire-right {
    width: auto;
    height: auto;
    text-align: right;
  }

  .element-partenaire {
    width: auto;
    height: auto;
  }

  .image {
    filter: grayscale(100%);
  }

  .image:hover {
    filter: grayscale(0%);
  }
  /* ====== Accordeon ====== */

  .input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  .accordion-wrapper {
    overflow: hidden;
    width: auto;
    margin: 0 auto;
  }

  .accordion {
    width: 100%;
    color: black;
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
    background: white;
    border-bottom: 1px solid black; 
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
  }

  /* .accordion-label:hover {
    background: #EFEFEF;
  } */

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
    background: white;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    font-size: 14px;
  }

  input:checked+.accordion-label {
    background: #EFEFEF;
  }

  input:checked+.accordion-label::after {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  input:checked~.accordion-content {
    max-height: 100vh;
    padding: 16px;
  }

  /*========== NAZO'S BUSINESS ==========*/

  .image-business {
    width: 100%;
  }

  .titre-business {
    font-size: 30px;
    color: #fff;
  }

  .text-business {
    text-align: justify;
    font-size: 13px;
    color: #fff;
  }

  .top-left {
    position: relative;
    top: -268px;
    left: 16px;
  }

  .box-business {
    text-align: initial;
    width: 48%;
    padding: 2rem;
  }

  .box-business-two {
    text-align: center;
    width: 100%;
  }

  .sub-box-business-two {
    background-color: rgb(46, 46, 46);
    padding: 1rem;
  }

  .titre-business-two,
  .text-business-two {
    color: white;
    font-weight: 600;
  }

  .box-content-business {
    margin: 0;
    padding: 0;
    height: 300px;
  }

  .button-business-two {
    font-family: "BasisGrotesque";
    color: #f7b655;
    padding: 0.8rem 1.3rem;
    background-color: #fff;
    border: rgb(46, 46, 46);
    margin-right: 0px;
    transition: 0.5s;
    font-size: 14px;
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


  /* lorsque l'écran est inférieur à 992px */
  @media (max-width: 992px) {
    .titre-business {
      font-size: 35px;
    }

    .text-business {
      font-size: 13px;
    }
  }

  @media (max-width: 840px) {
    .titre-business {
      font-size: 28px;
    }
  }

  @media (max-width: 767px) {
    .text-business {
      font-size: 12px;
    }
  }

  @media (max-width: 672px) {
    .titre-business {
      font-size: 25px;
    }

    .text-business {
      font-size: 12px;
    }
  }

  @media (max-width: 654px) {
    .box-content-business {
      display: none;
    }
  }

  @media (min-width: 654px) {
    .box-content-business-two {
      display: none;
    }
  }
</style>