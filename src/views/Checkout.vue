<template>
  <div class="commande">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <Navbar />
    <main class="banner">
      <section class="content section " id="checkout">
        <!-- <h2 class="section__title">Home</h2> -->
        <div class="row col-md-12">
          <div class="col-md-6">
            <div class="content-image">
              <img :src="product.image" :alt="product.name" class="product-image" width="170px"
                height="170px" />
            </div>
            <div class="content-text">
              <p class="titre-commande">Détails</p>
              <div class="d-flex justify-content-between">
                <p>Poids :</p>
                <p>{{ product.weight }} kg</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Quantité :</p>
                <p v-if="product.quantity > 0" class="instock">En stock</p>
                <p v-else class="noinstock">En rupture de stock</p>
              </div>
              <p class="descripition-commande">
                {{ product.description }}
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <form class="panier">
              <p class="titre-commande">Ma commande</p>
              <!-- Choix entreprise || particulier -->
              <div class="content__status">
                <select v-model="picked" class="contact__input border" @change="onChange($event)">
                  <option disabled value="">Choisissez une option</option>
                  <option value="particulier">Particulier</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>

              <!--================  Image chef cuisto  ==================-->
              <div v-if="picked ===''" class="text-center">
                  <!-- <img src="../assets/images/cuisinier.jpg" alt="cuisinier" width="300px" height="200px"> -->
              </div>

              <!--================  Pour les particuliers  ==================-->
              <div v-if="picked === 'particulier'">
                <input type="text" name="name" maxlength="50" v-model="nom" placeholder="Nom"
                  class="contact__input border" />
                <input type="tel" id="tel" name="tel" placeholder="numéro de téléphone" class="contact__input border"
                  @change="onChangeTel($event)" @input="onChangeTel($event)"
                  pattern="^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$" required v-model="telephone" />
                <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
                  Le numéro de téléphone est invalide
                </p>
                <select v-model="selected" v-on:change="changeLivraisonPrice(selected)" class="contact__input border">
                  <option disabled value="">Choisissez une adresse</option>
                  <option v-for="(item, index) in quartierList" :key="index">
                    {{item.viewValue}}
                  </option>
                </select>

                  <div v-if="picked">
                    <label>Quantité :</label>
                    <div class="row quantite">
                      <input type="button" id="quantity" name="count" value="-" class="control-quantite"
                        v-on:click="quantite--" v-if="quantite > 1" />
                      <div class="col">{{ quantite }}</div>
                      <div class="col">
                        <input type="button" name="count" value="+" class="control-quantite" v-on:click="quantite++" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Prix :</p>
                      <p>{{ priceAmount }} FCFA</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Frais de livraison :</p>
                      <p>{{ fraislivraison }} FCFA</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Total :</p>
                      <p>{{ totalAmount }} FCFA</p>
                    </div>
                  </div>

                  <button v-if="this.nom !== '' && isValidTel && this.selected !== '' && product.quantity > 0" type="button" name="submit"
                    class="default__btn d-block" data-bs-toggle="modal" data-bs-target="#recap">Appliquer la
                    commande</button>
                  <button v-else type="button" name="submit" class="default__disable__btn d-block"
                    disabled="true">Appliquer la commande</button>
              </div>

              <!--================  Pour les entreprises  ==================-->
              <div v-if="picked === 'entreprise'">
                  <input type="text" v-model="code" name="name" maxlength="50" placeholder="Entrez votre code entreprise"
                    class="contact__input border" @change="onChangeCode($event)" @input="onChangeCode($event)" />
                  <p class="text-danger" style="font-size: 12px" v-if="!isValidCode && code !== ''">
                    Le code n'est invalide
                  </p>

                  <div v-if="picked">
                    <label>Quantité :</label>
                    <div class="row quantite">
                      <input type="button" id="quantity" name="count" value="-" class="control-quantite"
                        v-on:click="quantite--" v-if="quantite > 1" />
                      <div class="col">{{ quantite }}</div>
                      <div class="col">
                        <input type="button" name="count" value="+" class="control-quantite" v-on:click="quantite++" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Prix :</p>
                      <p>{{ priceAmount }} FCFA</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Frais de livraison :</p>
                      <p>{{ fraislivraison }} FCFA</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p>Total :</p>
                      <p>{{ totalAmount }} FCFA</p>
                    </div>
                  </div>

                  <button v-if="this.code !== '' && isValidCode && this.quantite >= 10" type="button" name="submit"
                    class="default__btn d-block" data-bs-toggle="modal" data-bs-target="#recap">Appliquer la
                    commande</button>
                  <button v-else type="button" name="submit" class="default__disable__btn d-block"
                    disabled="true">Appliquer la commande</button>
              </div>
          </form>
          </div>
        </div>
      </section>
    </main>
    <Footer />

    <!-- Modal modifier ses informations -->
    <div class="modal fade" id="recap" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-white">
            <h5 class="modal-title titre-commande" id="exampleModalLabel">
              Récapitulatif de la commande
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="commander">
              <div class="row" style="border-bottom: 1px dashed gray">
                <div class="col-md-6">
                  <!-- <img :src="product.image" :alt="product.name" class="product-image" width="80px" height="80px" /> -->
                  <img src="../assets/images/product.png" alt="Saka-saka" class="product-image" width="128px"
                    height="128px" />
                </div>
                <div class="col-md-6">
                  <p>{{quantite}}x Feuilles de manioc - {{priceAmount}} FCFA</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <p>Frais de livraison:</p>
                </div>
                <div class="col-md-6">
                  <p>{{fraislivraison}} FCFA</p>
                </div>
              </div>
              <div class="row" style="border-bottom: 1px dashed gray; margin-bottom: 10px;">
                <div class="col-md-6"><b>Total:</b></div>
                <div class="col-md-6"><b>{{totalAmount}} FCFA</b></div>
              </div>
              <div>
                <p>
                  <!-- Livraison pour <span v-if="client.genre === 'masculin' ">Mr</span> <span
                    v-else-if="client.genre === 'feminin' ">Mme</span> {{nom}} {{prenom}} <br> -->
                  Livraison pour {{nom}} <br>
                  - Adresse: quartier {{selected}} <br>
                  - Numéro de téléphone : {{telephone}}
                </p>
              </div>
              <input type="submit" name="submit" value="Confirmer" class="commander" data-bs-dismiss="modal"
                aria-label="Close" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar.vue";
  import Footer from "../components/Footer.vue";
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  // import {
  //   mapGetters
  // } from "vuex";
  import Swal from "sweetalert2";
  import constant from "../../constant";
  import axios from "axios";
  export default {
    name: "Commande",
    components: {
      Navbar,
      Footer,
      Loading,
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        isValidTel: true,
        isValidCode: true,
        idproduit: 0,
        idcommand: SVGAnimatedNumber,
        quantite: 1,
        newprice: 1000,
        number: 800,
        fraislivraison: 500,
        total: 0,
        regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
        picked: "",
        code: "",
        prenom: "",
        adresse: "",
        nom: "",
        telephone: "",
        image: "",
        quantity: 0,
        weight: 0,
        error: "",
        selected: "",
        product: null,
        codelist: [],
        quartierList: [{
            value: '1',
            viewValue: 'Aeroport'
          },
          {
            value: '2',
            viewValue: 'Centre-ville'
          },
          {
            value: '3',
            viewValue: 'Côte mateve'
          },
          {
            value: '4',
            viewValue: 'Côte sauvage'
          },
          {
            value: '5',
            viewValue: 'Grand-marché'
          },
          {
            value: '6',
            viewValue: 'Mpita'
          },
          {
            value: '7',
            viewValue: 'Kilomètres 4'
          },
          {
            value: '8',
            viewValue: 'Och'
          },
          {
            value: '9',
            viewValue: 'Tchikobo'
          },
          {
            value: '10',
            viewValue: 'Mvoumvou'
          },
          {
            value: '11',
            viewValue: 'Faubourg'
          },
          {
            value: '12',
            viewValue: 'Loandjili'
          },
          {
            value: '13',
            viewValue: 'Malala'
          },
          {
            value: '14',
            viewValue: 'Matende'
          },
          {
            value: '15',
            viewValue: 'Mawata'
          },
          {
            value: '16',
            viewValue: 'Mongo Kamba'
          },
          {
            value: '17',
            viewValue: 'Mongo Mpoukou'
          },
          {
            value: '18',
            viewValue: 'Mpaka'
          },
          {
            value: '19',
            viewValue: 'Mpatra'
          },
          {
            value: '20',
            viewValue: 'Ngoyo'
          },
          {
            value: '21',
            viewValue: 'Nkouinkou'
          },
          {
            value: '22',
            viewValue: 'Raffinerie'
          },
          {
            value: '23',
            viewValue: 'Sangolo'
          },
          {
            value: '24',
            viewValue: 'Siafoumou'
          },
          {
            value: '25',
            viewValue: 'Tchiali'
          },
          {
            value: '26',
            viewValue: 'Vindoulou'
          },
        ],
        faradressList: [{
            value: '1',
            viewValue: 'Côte mateve'
          },
          {
            value: '2',
            viewValue: 'Faubourg'
          },
          {
            value: '3',
            viewValue: 'Loandjili'
          },
          {
            value: '4',
            viewValue: 'Malala'
          },
          {
            value: '5',
            viewValue: 'Matende'
          },
          {
            value: '6',
            viewValue: 'Mawata'
          },
          {
            value: '7',
            viewValue: 'Mongo Kamba'
          },
          {
            value: '8',
            viewValue: 'Mongo Mpoukou'
          },
          {
            value: '9',
            viewValue: 'Mpaka'
          },
          {
            value: '10',
            viewValue: 'Mpatra'
          },
          {
            value: '11',
            viewValue: 'Ngoyo'
          },
          {
            value: '12',
            viewValue: 'Nkouinkou'
          },
          {
            value: '13',
            viewValue: 'Raffinerie'
          },
          {
            value: '14',
            viewValue: 'Sangolo'
          },
          {
            value: '15',
            viewValue: 'Siafoumou'
          },
          {
            value: '16',
            viewValue: 'Tchiali'
          },
          {
            value: '17',
            viewValue: 'Vindoulou'
          },
        ],
        nearadressList: [{
            value: '1',
            viewValue: 'Centre-ville'
          },
          {
            value: '2',
            viewValue: 'Grand-marché'
          },
          {
            value: '3',
            viewValue: 'Mpita'
          },
          {
            value: '4',
            viewValue: 'Kilomètres 4'
          },
          {
            value: '5',
            viewValue: 'Och'
          },
          {
            value: '6',
            viewValue: 'Tchikobo'
          },
          {
            value: '7',
            viewValue: 'Aeroport'
          },
          {
            value: '8',
            viewValue: 'Mvoumvou'
          },
          {
            value: '9',
            viewValue: 'Côte sauvage'
          },
        ],
      };
    },
    methods: {
      // updateClient() {
      //   this.isLoading = true;
      //   if (this.client.address && this.client.prenom) {
      //     const token = localStorage.getItem("token");
      //     axios
      //       .patch(
      //         constant.apiURL + "client/update/" + this.client.id,
      //         this.client, {
      //           headers: {
      //             Authorization: `Bearer ${token}`,
      //           },
      //         }
      //       )
      //       .then((response) => {
      //         console.log(response.data);
      //         if (response.data.id !== null) {
      //           this.commander();
      //         } else {
      //           this.isLoading = false;
      //           console.log("error");
      //         }
      //       })
      //       .catch((error) => {
      //         this.isLoading = false;
      //         console.log(error);
      //       });
      //   } else {
      //     this.$modal.hide("modal-verification");
      //     this.isLoading = false;
      //     Swal.fire({
      //       icon: "error",
      //       title: "Afin de valider votre commande, veuillez compléter le formulaire.",
      //       showConfirmButton: true,
      //     });
      //   }
      // },
      commander() {
        this.isLoading = true;
        // Si la quantité commandée est supérieure à la quantité en stock
        // alors on affiche un message pour demander de la diminuer
        if (this.quantite > this.product.quantity) {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "<b>La quantité demandée n'est pas disponible en stock.",
            showConfirmButton: true,
          });
        } else {
          axios
          .post(
            constant.apiURL + "commands/add", {
              nom: this.nom,
              telephone: this.telephone,
              adresse: this.selected,
              price: this.totalAmount,
              quantity_command: this.quantite,
              state: "en cours",
              product_id: this.product.id
            }
          )
          .then((response) => {
            // console.log(response);
            this.isLoading = false;
            Swal.fire({
                icon: "success",
                title: "<b>Commande confirmée</b> <br> Bonjour " + response.data.nom + ", <br>votre commande N°"+ response.data.reference + " de " + response.data.quantity_command +
                 " Saka-saka flc a débuté aujourd'hui",
                showConfirmButton: true,
              });
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            Swal.fire({
              icon: "error",
              title: "Oups, une erreur est survenue, veuillez réessayer plutard.",
              showConfirmButton: true,
            });
          });
        }
      },
      // emailConfirmation(id) {
      //   const token = localStorage.getItem("token");
      //   const headers = {
      //     Authorization: `Bearer ${token}`
      //   };
      //   axios
      //     .get(constant.apiURL + "command/confirmation/" + id + "/" + this.fraislivraison, {
      //       headers
      //     })
      //     .then((response) => {
      //       if (response.data.code == 200) {
      //         this.isLoading = false;
      //         Swal.fire({
      //           icon: "success",
      //           title: "Félicitations ! \n Votre commande n°: #100-" + localStorage.getItem("command_id") +
      //             " est validée. \n Nous vous enverrons une confirmation par mail",
      //           showConfirmButton: true,
      //         });
      //         this.$router.push("/Profil");
      //       } else {
      //         this.$modal.hide("modal-verification");
      //         this.isLoading = false;
      //         Swal.fire({
      //           icon: "error",
      //           title: "Oups... Une erreur est survenue, veuillez réessayer plutard.",
      //           showConfirmButton: true,
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       Swal.fire({
      //         icon: "error",
      //         title: "Oups, une erreur est survenue, veuillez réessayer plutard.",
      //         showConfirmButton: true,
      //       });
      //       this.isLoading = false;
      //     });
      // },
      changeLivraisonPrice(value) {
        // console.log(value);
        for (let i = 0; i < this.faradressList.length; i++) {
          // console.log(this.faradressList[i].viewValue);
          if (value == this.faradressList[i].viewValue) {
            this.fraislivraison = 1000
            break
          } else {
            this.fraislivraison = 500
          }
        }
      },
      onChangeTel(e) {
        const numero = e.target.value;
        this.isTelephoneValid(numero);
      },
      isTelephoneValid: function(inputTel) {
        this.isValidTel = this.regexTelephone.test(inputTel);
      },
      onChange(e) {
        // console.log(e.target.value);
        const value = e.target.value;
        if (value === "particulier") {
          this.fraislivraison = 500;
        }
      },
      onChangeCode(e) {
        const numero = e.target.value;
        const oldfraislivraison = this.fraislivraison;
        // console.log(oldfraislivraison)
        for (let i = 0; i < this.codelist.length; i++) {
          // console.log(this.codelist[i]);
          if (numero == this.codelist[i].code) {
            if (this.codelist[i].entreprise === "Casino") {
              this.number = 700;
            }
            this.isValidCode = true;
            this.fraislivraison = 0;
            this.nom = this.codelist[i].entreprise;
            this.telephone = this.codelist[i].telephone;
            this.selected = this.codelist[i].adresse;
            break
          }
          else if(numero !== this.codelist[i].code) {
            this.fraislivraison = oldfraislivraison;
            this.isValidCode = false;
          }
        }
      }
    },
    computed: {
      // contrôle sur l'activation du bouton
      isDisabled() {
        return this.selected === true;
      },
      totalAmount() {
        return this.priceAmount + this.fraislivraison;
      },
      priceAmount() {
        if (this.quantite >= 2) {
          return this.number * this.quantite;
        }
        return this.newprice * this.quantite;
      },
      // ...mapGetters(["codelist"]),
      // ...mapGetters(["product"]),
      // ...mapGetters(["client"]),
    },
    created() {
      if (localStorage.getItem("product")) {
        this.product = JSON.parse(localStorage.getItem("product"));
        this.idproduit = this.product.id;
        // console.log("yes product", this.product)
      } else {
        this.$store.dispatch("getProduct");
      }

      if (localStorage.getItem("codes")) {
        this.codelist = JSON.parse(localStorage.getItem("codes"));
        // console.log("yes cooodes", this.codes)
      } else {
        this.$store.dispatch("getCode");
      }
    },
    mounted() {},
  }; 
  </script>

<style scoped>

input[type=radio] {
  background-color: transparent;
  border: none;
  width: 10px;
}

.content-image {
  text-align: center;
  width: 200px;
  /* margin-left: 100px; */
  /* margin-top: 50px; */
}

.content-text {
  width: 300px;
  height: auto;
  background-color: #fff;
  padding: 5%;
  /* margin-left: 80px; */
  /* margin-top: 50px; */
  box-shadow: 0 2px 6px rgba(65, 11, 16, 0.15);
}

.panier {
  height: 100%;
  padding: 4%;
  margin-bottom: 50px;
  background-color: #fff;
  /* width: 300px; */
  box-shadow: 0 2px 6px rgba(65, 11, 16, 0.15);
}

.panier:hover {
  box-shadow: 0 3px 12px rgba(65, 11, 16, 0.15);
}

.instock {
  color: rgb(26, 179, 26);
}

.noinstock {
  color: rgb(218, 38, 38);
}

.descripition-commande {
  font-size: 14px;
}

.quantite {
  text-align: center;
  padding: 0.8rem;
}

.control-quantite {
  background-color: black;
  color: #fff;
  border: 1px solid black;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 15px;
  width: 150px;
  outline: none;
}

.modal-content {
  padding: 5%;
}


@media (max-width: 768px) {
  .content-text {
    width: auto;
    margin-bottom: 50px;
  }

  .content-image {
    text-align: center;
    height: 280px;
    padding: 3%;
  }
}

</style>