<template>
  <div class="recherche">
    <Navbar />

    <div class="banner">
      <div class="content section">
        <!-- Disponibilités sur Brazzaville et Pointe-noire -->
        <div class="info-banner">
          <h2 class="titre" style="line-height: 45px;">Disponibilités sur <span style="color: #4f74da">Brazzaville et
              Pointe-noire</span></h2>
          <p style="margin-bottom: 27px;">
            Pour effectuer une recherche, saisissez la spécialité et choisissez une ville ou utilisez les différentes
            spécialités proposées.
            Vous pouvez également consulter la liste de nos praticiens immédiatement disponibles ci-dessous.
          </p>
          <div id="content-specialite" class="">
            <div class="element">
              <button class="specialite__btn active"> Médecin généraliste</button>
            </div>
            <div class="element">
              <button class="specialite__btn">Pédiatre</button>
            </div>
            <div class="element">
              <button class="specialite__btn">Dermatologue</button>
            </div>
            <div class="element">
              <button class="specialite__btn">Gynécologue</button>
            </div>
          </div>
          <form v-on:submit.prevent="rechercher">
            <div class="row">
              <div class="col-4">
                <div class="autocomplete">
                  <input id="myInput" type="text" name="myCountry" placeholder="Spécialité"
                    class="contact__input border" v-model="specialite">
                </div>
              </div>
              <div class="col-4">
                <select v-model="selected" name="ville" placeholder="Ville" class="contact__input border">
                  <option disabled value="">Choisissez une ville</option>
                  <option v-for="(item, index) in cityList" :key="index">
                    {{item.viewValue}}
                  </option>
                </select>
              </div>
              <div class="col-4 bouton-pc-tb">
                <button class="default__btn" :disabled="isDisabled" @click="rechercher()">
                  Rechercher
                </button>
              </div>
              <div class="col-8 bouton-mobile">
                <button class="default__btn" :disabled="isDisabled" @click="rechercher()">
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Praticiens -->
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>

        <div class="info-banner">
          <div class="row">
            <!-- premier bloc -->
            <div class="col-3 bloc-medecin bloc-medecin-1">
              <div class="content-photo">
                <div v-if="nom">
                  <label class="label rounded-circle">
                    <p class="char">{{nom}}</p>
                  </label>
                </div>
                <img src="../assets/images/user.png" class="rounded-circle border" alt="image medecin" width="50px"
                  height="50px" v-else>
              </div>
              <div class="content-praticien-info">
                <p class="nom-praticien">Dr {{nom}}</p>
                <p class="specialite-praticien">Médecin Généraliste</p>
              </div>
            </div>
            <!-- second bloc -->
            <div class="col-2 bloc-medecin bloc-medecin-2 border" style="padding-top: 50px;">
              <div class="content-praticien-info">
                <p class="titre-tarif-praticien">Tarif</p>
                <p class="tarif-praticien">10.000 Fcfa</p>
                <p class="titre-ville-praticien">Ville</p>
                <p class="ville-praticien">Pointe-noire</p>
              </div>
            </div>
            <!-- troisième bloc -->
            <div class="col-6 bloc-medecin bloc-medecin-3 border">
              <div id="content-date">
                <!-- <div class="arrow-horaire">
                  <i class='bx bx-left-arrow-alt'></i>
                </div> -->
                <div class="bloc-horaire">
                  <div id="content-horaire">
                    <div class="element">
                      <p class="titre-date-praticien">Lundi</p>
                      <span class="date-praticien">10/04</span>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">11:00</button>
                    </div>
                  </div>
                </div>

                <div class="bloc-horaire">
                  <div id="content-horaire">
                    <div class="element">
                      <p class="titre-date-praticien">Mardi</p>
                      <span class="date-praticien">11/04</span>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">11:00</button>
                    </div>
                  </div>
                </div>

                <div class="bloc-horaire">
                  <button class="default__vide__btn" @click="goToPraticien(1)">Voir le profil</button>
                </div>

                <!-- <div class="arrow-horaire">
                  <i class='bx bx-right-arrow-alt'></i>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="info-banner">
          <div class="row">
            <!-- premier bloc -->
            <div class="col-3 bloc-medecin bloc-medecin-1">
              <div class="content-photo">
                <!-- <div v-if="nom">
                  <label class="label rounded-circle">
                    <p class="char">{{nom}}</p>
                  </label>
                </div> -->
                <img src="../assets/images/benit.png" class="rounded-circle border" alt="image medecin" width="50px"
                  height="50px">
              </div>
              <div class="content-praticien-info">
                <p class="nom-praticien">Dr Okiessi Bénit IBONGO</p>
                <p class="specialite-praticien">Médecin Généraliste</p>
              </div>
            </div>
            <!-- second bloc -->
            <div class="col-2 bloc-medecin bloc-medecin-2 border" style="padding-top: 50px;">
              <div class="content-praticien-info">
                <p class="titre-tarif-praticien">Tarif</p>
                <p class="tarif-praticien">10.000 Fcfa</p>
                <p class="titre-ville-praticien">Ville</p>
                <p class="ville-praticien">Brazzaville</p>
              </div>
            </div>
            <!-- troisième bloc -->
            <div class="col-6 bloc-medecin bloc-medecin-3 border">
              <div id="content-date" class="">
                <!-- <div class="arrow-horaire">
                  <i class='bx bx-left-arrow-alt'></i>
                </div> -->
                <div class="bloc-horaire">
                  <div id="content-horaire">
                    <div class="element">
                      <p class="titre-date-praticien">Lundi</p>
                      <span class="date-praticien">10/04</span>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">11:00</button>
                    </div>
                  </div>
                </div>

                <div class="bloc-horaire">
                  <div id="content-horaire">
                    <div class="element">
                      <p class="titre-date-praticien">Mardi</p>
                      <span class="date-praticien">11/04</span>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">09:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:00</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">10:30</button>
                    </div>
                    <div class="element">
                      <button class="horaire__btn">11:00</button>
                    </div>
                  </div>
                </div>
                <div class="bloc-horaire">
                  <button class="default__vide__btn">Voir le profil</button>
                </div>

                <!-- <div class="arrow-horaire">
                  <i class='bx bx-right-arrow-alt'></i>
                </div> -->
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
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  // import CryptoJS from 'crypto-js'
  // import AES from 'crypto-js/aes'
  // import constant from "../../constant";
  // import constant from "../../constant";
  export default {
    name: "Recherche",
    components: {
      Navbar,
      Footer,
      Loading
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
        specialite:"",
        selected:"",
        nom: "Dervan TATI",
      };
    },
    methods: {

      goToPraticien(id) {
        console.log(id)
        // let encryptedData = AES.encrypt(id, constant.secretKey).toString()
        // console.log(encryptedData);
        this.$router.push("/praticien/"+ id);
      }
    },
    mounted() {
      function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function () {
          var a, b, i, val = this.value;
          /*close any already open lists of autocompleted values*/
          closeAllLists();
          if (!val) {
            return false;
          }
          currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function () {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
              });
              a.appendChild(b);
            }
          }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
          var x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
          }
        });

        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }

        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
          closeAllLists(e.target);
        });
      }

      /*An array containing all the country names in the world:*/
      var countries = [
        "Audioprothésiste",
        "Anatomopathologiste",
        "Anesthesiste-Réanimateur", 
        "Andrologue",
        "Biologiste",
        "Cardiologue",
        "Cardiologue Rythmologue", 
        "Chirurgien Générale",
        "Chirurgien Orthopédiste",
        "Chirurgien Pédiatrique",
        "Chirurgien Urologue",
        "Coach Sportif",
        "Dentiste",
        "Dermatologue",
        "Diabétologue",
        "Diététicien",
        "Généticien",
        "Gynécologue",
        "Hépatologue",
        "Kinésithérapeute",
        "Kinésithérapeute Du Sport",
        "Medecin Généraliste",
        "Medecin Urgentiste",
        "Pédiatre",
        "Pédodontiste",
        "Ophtalmologue",
        "Orthophoniste",
        "Neurochirurgien",
        "Neurologue",
        "Neuropédiatre",
        "Neurophysiologiste",
        "Sage-femme",
        "Stomatologue",
        "Tabacologue",
        "Traumatologue-orthopédiste",
        "Traumato-orthopédiste pédiatrique",
      ];

      /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
      autocomplete(document.getElementById("myInput"), countries);

      // active link
      var header = document.getElementById("content-specialite");
      var btns = header.getElementsByClassName("specialite__btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        });
      }
    }
  }
  </script>

<style scoped>

/* bloc praticien */


.bloc-horaire {
  width: 100%;
  height: 50px;
  padding: 2%;
  text-align: center;
  margin-bottom: 10px;
}

.bloc-medecin {
 border-radius: 10px;
}

.bloc-medecin-1 {
  margin-right: 40px;
}

.bloc-medecin-2 {
  margin-right: 35px;
}

.bloc-medecin-2,
.bloc-medecin-3 {
  padding: 1%
}


.info-banner {
  margin-bottom: 30px;
}


/* Recherche specialité */

#content-specialite {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 25px;
}

.specialite__btn {
  font-family: 'BasisGrotesque', sans-serif;
  font-weight: bold;
  font-size: 14px;
  height: 47px;
  line-height: 22px;
  padding-left: 24px;
  padding-right: 24px;
  margin-right: 10px;
  border: none;
  outline: none;
  color: #343343;
  background-color: white;
}

.active, .specialite__btn:hover {
  transition: all 0.2s ease 0s;
  background-color: #c4d3ff;
  color:  #4f74da;
  border-radius: 10px;
  border: none;
}

.active {
  font-family: 'BasisGrotesque', sans-serif;
  background-color: #bbccfd;
  color: #4f74da;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 14px;
  border-radius: 10px;
}

/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 300px;
}

input {
  border: 1px solid transparent;
  background-color: #ffff;
  padding: 10px;
  font-size: 16px;
}

input[type=text] {
  background-color: #FFF;
  width: 100%;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}


/* bannière */

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