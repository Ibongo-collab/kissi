<template>
    <div class="recherche">
        <Navbar />

        <div class="banner">
            <div class="content section">
            <div class="info-banner">
                <h2 class="titre" style="line-height: 45px;">Disponibilités sur <span style="color: #4f74da">Brazzaville et Pointe-noire</span></h2>
              <p class="mb-5">
                Pour effectuer une recherche, saisissez la spécialité et choisissez une ville. Vous pouvez également consulter 
                la liste de nos praticiens immédiatement disponibles ci-dessous.
              </p>
              <form v-on:submit.prevent="rechercher">
                <div class="row">
                  <div class="col-4">
                    <input type="text" class="contact__input border" placeholder="Spécialité" v-model="adresse" />
                  </div>
                  <div class="col-4">
                    <select v-model="selected" name="ville" v-on:change="changeCity(selected)" placeholder="" class="contact__input border">
                        <option disabled value="">Choisissez une ville</option>
                        <option v-for="(item, index) in cityList" :key="index">
                            {{item.viewValue}}
                        </option>
                    </select>
                  </div>
                  <div class="col-4 bouton-pc-tb">
                    <button class="default__btn" style="" :disabled="isDisabled"
                      @click="rechercher()">
                      Rechercher
                    </button>
                  </div>
                  <div class="col-8 bouton-mobile">
                    <button class="boutton-rechercher-banner rounded text-decoration-none" :disabled="isDisabled"
                      @click="rechercher()">
                      Rechercher
                    </button>
                  </div>
                </div>
              </form>
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
        name: "Recherche",
        components: {
            Navbar,
            Footer,
        },
        data() {
            return {
                cityList: [{
                    value: '1',
                    viewValue: 'Brazzaville'
                },
                {
                    value: '2',
                    viewValue: 'Pointe-noire'
                },
                {
                    value: '3',
                    viewValue: 'Dolisie'
                },
                ],
            };
        },
    }
</script>

<style scoped>

.boutton-rechercher-banner {
  font-family: 'BasisGrotesque', sans-serif;
  background-color: #f7b655;
  color: #fff;
  padding: 0.7rem 0.6rem;
  border: 1px solid #f7b655;
  border-radius: 10px;
  width: 100%;
  outline: none;
  font-weight: 600;
  font-size: 15px;
}

.info-banner {
  color: black;
  padding: 1.3rem;
  padding-bottom: 30px;
  background-color: #fff;
  border-radius: 10px;
}

.search-adresse-banner {
  width: 100%;
  font-size: 13px;
  font-family: "BasisGrotesque";
  padding: 0.8rem 0.4rem;
  outline: #fdcd3b;
  border-radius: 4px;
  border: 1px solid rgb(211, 201, 201);
}

@media (max-width: 882px) {
  .col-8 {
    width: 250px;
  }
  .info-banner {
    padding: 1rem;
    padding-bottom: 15px;
  }
}

@media (max-width: 840px) {
  .col-8 {
    width: 200px;
  }
  .info-banner {
    padding: 1rem;
    padding-bottom: 15px;
    margin-bottom: 30px;
  }
  .box-categorie {
    margin-bottom: 25px;
  }
  .titre-business {
    font-size: 28px;
  }
}

@media (max-width: 767px) {
  .col-8 {
    width: 80%;
  }
  .info-banner {
    padding: 1.3rem;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .box-categorie {
    margin-bottom: 30px;
  }
  .image-banner {
    text-align: center;
  }
  .title {
    font-size: 2.5rem;
  }
  .text-business {
    font-size: 12px;
  }
}

@media (max-width: 672px) {
  .col-8 {
    width: 70%;
  }
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

@media (max-width: 540px) {
  .col-8 {
    width: 100%;
    margin-bottom: 10px;
  }
  .bouton-pc-tb {
    display: none;
  }
  .boutton-rechercher-banner {
    width: 100%;
  }
  .title {
    font-size: 1.9rem;
  }
}

@media (min-width: 540px) {
  .bouton-mobile {
    display: none;
  }
}

@media (min-width: 654px) {
  .box-content-business-two {
    display: none;
  }
}

@media (max-width: 480px) {
  .col-6 {
    width: 100%;
  }

}

</style>