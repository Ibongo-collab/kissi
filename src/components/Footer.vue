<template>
  <!--========== FOOTER ==========-->
  <footer class="footer section">

    <div id="conteneur" class="content">

      <div class="element">
        <p class="text-white"><b>Accès</b></p>
        <router-link to="" class="footer__link">Patient</router-link> <br>
        <router-link to="" class="footer__link">Professionnel de santé</router-link> <br>
      </div>

      <div class="element">
        <p class="text-white"><b>Divers</b></p>
        <router-link to="" class="footer__link">Equipe médicale</router-link> <br>
        <router-link to="" class="footer__link">A propos de Kissi</router-link> <br>
        <router-link to="" class="footer__link">Indice de masse corporelle</router-link> <br>
        <router-link to="" class="footer__link">Carrières</router-link> <br>
      </div>

      <div class="element">
        <p class="text-white"><b>Contact</b></p>
        <a :href="'mailto:'+email" class="footer__link">{{email}}</a> <br>
        <a :href="'tel:'+numero" class="footer__link">{{numero}}</a>
      </div>

      <div class="element">
        <p class="text-white"><b>Nous suivre</b></p>
        <p class="">
          <a href="#" class="footer__social"><i class='bx bxl-facebook'></i></a>
          <a href="https://www.instagram.com/instagram/" target="_blank" class="footer__social"><i
              class='bx bxl-instagram'></i></a>
          <a href="#" target="_blank" class="footer__social"><i class='bx bxl-twitter'></i></a>
          <a href="#" target="_blank" class="footer__social"><i class='bx bxl-youtube'></i></a>
        </p>
      </div>

    </div>

    <div class="footer__copy">
      <router-link to="">Politique de confidentialité </router-link> | <router-link to="">Conditions d'utilisation
      </router-link>
      <p class="text-white">&#169;{{copyright}}. Tous les droits sont réservés.</p>
    </div>

  </footer>
</template>


<script>
  export default {
    name: "Footer",
    data() {
      return {
        namelogo: "Kissi",
        email: "contact@kissi.com",
        numero: "+242 06 999 53 32"
      }
    },
    computed: {
      copyright() {
        const currentYear = new Date().getFullYear()
        return `Copyright ${this.namelogo} ${currentYear}`
      }
    },
  }
</script>

<style scoped>
  p {
    font-weight: bold;
  }

  a {
    text-decoration: none;
  }

  .footer {
    background-color: #343a40;
  }

  .element {
    width: 200px;
    height: auto;
    padding-bottom: 20px;
  }

  #conteneur {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: auto;
    height: auto;
  }

  .footer__container {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    row-gap: 2rem;
  }

  .footer__social {
    font-size: 40px;
    color: white;
    margin-right: 3%;
    border: 1px solid black;
    border-radius: 10px;
    padding-top: 5px;
  }

  .footer__social:hover {
    color: rgb(233, 230, 230);
  }

  .footer__title {
    font-size: var(--h2-font-size);
    color: white;
    margin-bottom: var(--mb-2);
  }

  .footer__logo:hover {
    color: rgb(241, 240, 240);
  }

  .footer__link {
    display: inline-block;
    color: rgb(209, 209, 209);
    margin-bottom: var(--mb-1);
  }

  .footer__link:hover {
    color: white;
  }

  .footer__copy {
    text-align: center;
    font-size: var(--small-font-size);
    color: white;
    margin-top: 3.5rem;
  }

  .section {
    padding: 4rem 0 2rem;
  }
</style>