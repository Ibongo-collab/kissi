<template>
  <div class="home">

    <Navbar />

    <main>
      <!--=============== HOME ===============-->
      <div class="banner">
        <div class="content" id="home">
          <div class="row">
            <div class="col-md-8">
              <h2 class="grand-titre"><span style="color: #4f74da">+</span> Que prendre des rendez-vous</h2>
                <p class="description">
                  Kissi vous offre une expérience inédite en vous permettant de prendre rendez-vous avec votre
                  médecin en ligne, 7j/7, de 6 heures à minuit.
                </p>
              <div class="content__btn">
                <button type="button" @click="goToRecherche" class="default__btn">Prendre un rendez-vous</button>
              </div>
            </div>
            <div class="col-md-4">
              <img src="../assets/images/capture-tel.png" alt="image saka-saka" class="product-image mb-3">
            </div>
          </div>
        </div>
      </div>

      <!--==================== PATIENT ====================-->
      <div class="content section" id="recette">
        <h2 class="titre">
          Je suis un patient, comment ça marche ?<br>
        </h2>
        <div id="conteneur">
          <div class="element-patient">
            <div class="rounded-circle banner"
              style="margin-bottom: 20px; width: 200px; height: 200px; text-align: center;">
              <img src="../assets/images/computer.png" alt="image" style="margin-top: 25px;">
            </div>
            <p class="sous-titre"><b>Je trouve mon médecin et
                je prends rendez-vous</b></p>
            <p>Trouvez votre médecin et prenez rendez-vous en choisissant sa ville et sa spécialité</p>
          </div>
          <div class="element-patient">
            <div class="rounded-circle banner"
              style="margin-bottom: 20px; width: 200px; height: 200px; text-align: center;">
              <img src="../assets/images/waiting-room.png" alt="image" style="margin-top: 25px;">
            </div>
            <p class="sous-titre"><b>Je réalise ma consultation le jour du rendez-vous</b></p>
            <p>Réalisez votre consultation au sein du centre hospitalier</p>
          </div>
          <div class="element-patient">
            <div class="rounded-circle banner"
              style="margin-bottom: 20px; width: 200px; height: 200px; text-align: center;">
              <img src="../assets/images/laptop.png" alt="image" style="margin-top: 35px;">
            </div>
            <p class="sous-titre"><b>Je retrouve mes documents
                médicaux</b></p>
            <p>Bénéficiez de documents médicaux valides en pharmacie, disponibles en ligne depuis votre espace personnel</p>
          </div>
        </div>
      </div>

      <!--=============== PRATICIEN ===============-->
      <section class="content mb-5" id="banner" style="padding: 4.5rem 0 2rem;">
        <div class="row">
          <div class="col-md-5">
            <h2 class="titre">Vous êtes praticien ?</h2>
            <p>Rejoignez Kissi et profitez de nombreux avantages : votre cabinet sera plus visible, vous bénéficierez de 
              rendez-vous 24/24 et de confirmations ainsi que de rappels de rendez-vous par SMS pour tous vos patients</p>
            <div class="content__btn">
              <button type="button" @click="goToPraticien" class="default__btn">En savoir plus</button>
            </div>
          </div>
          <div class="col-md-6">
            <iframe class="laptop" width="550" height="335" src="https://www.youtube.com/embed/0_gw0hbZpOM"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
              <iframe class="tablette" width="495" height="295" src="https://www.youtube.com/embed/0_gw0hbZpOM"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
              <iframe class="tablette-small" width="455" height="295" src="https://www.youtube.com/embed/0_gw0hbZpOM"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
              <iframe class="tablette-xsmall" width="400" height="295" src="https://www.youtube.com/embed/0_gw0hbZpOM"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
              <iframe class="device" width="100%" height="300" src="https://www.youtube.com/embed/0_gw0hbZpOM"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
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
  import {gsap} from "gsap";
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
    computed: {},
    created() {},
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

  .col-md-8 {
    margin-top: 100px;
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
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0px;
  }

  .element-patient {
    width: 300px;
    height: auto;
    border-radius: 10px;
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

  /* Media query */
  @media (min-width: 769px) {
    .device {
      display: none;
    }
  }

  @media (min-width: 977px) {
    .tablette, .tablette-small, .tablette-xsmall, .device {
      display: none;
    }
  }

  @media (max-width: 976px) {
    .laptop, .tablette-small, .tablette-xsmall {
      display: none;
    }

    .element-patient {
      width: 275px;
    }
  }

  @media (max-width: 899px) {
    .element-patient {
      width: 255px;
    }

    .tablette-small {
      display: block;
    }

    .tablette {
      display: none;
    }

    .grand-titre {
      font-size: 45px;
    }

    .titre {
      font-size: 25px;
    }

    .sous-titre {
      font-size: 20px;
    }
  }

  @media (max-width: 815px) {
    .element-patient {
      width: 230px;
    }

    .tablette-small {
      display: none;
    }

    .tablette-xsmall {
      display: block;
    }

    .grand-titre {
      font-size: 40px;
    }

    .description {
      font-size: 14px;
    }

    .titre {
      font-size: 22px;
    }

    .sous-titre {
      font-size: 18px;
    }
  }

  @media (max-width: 769px) {
    .col-md-4 {
      display: none;
    }

    .content__btn {
      width: 100%;
      margin-bottom: 25px;
    }

    .tablette-xsmall {
      display: none;
    }

    .col-md-8 {
      margin-top: 10px;
    }
  }

  @media (max-width: 722px) {
    .element-patient {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 550px) {

    .description {
      font-size: 13px;
    }

    .col-md-8 {
      overflow: scroll;
    }

    .element-patient {
      border: 1px solid #8b8b90;
      padding: 2%;
    }

  }

</style>