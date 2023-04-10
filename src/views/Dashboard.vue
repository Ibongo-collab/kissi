<template>
  <div class="profil">
    <!--========== SPINNER ==========-->
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <Navbar />

    <main>
      <section class="content" id="moncompte">
        <h2 class="titre">Tableau de bord</h2>
        <div class="indicateur_container bd-grid">
          <div class="indicateur">
            <p class="indicateur_titre">Nombre d'entreprises sous contrat</p>
            <p class="text-center stat">{{ numbercode }}</p>
          </div>

          <div class="indicateur">
            <p class="indicateur_titre">Nombre de commandes livrées</p>
            <p class="text-center stat">{{ numbercommand }}</p>
          </div>

          <div class="indicateur">
            <p class="indicateur_titre">Gain sur les ventes des commandes livrées</p>
            <p class="text-center stat">{{ gain }}</p>
          </div>
        </div>
        <div class="titre-profil" id="encours">
          <div class="accordion-wrapper">
            <div class="accordion">
              <input type="radio" name="radio-a" id="check1" class="input" checked>
              <label class="accordion-label" for="check1">Commandes reçu (en cours)</label>
              <div class="accordion-content">
                <!-- Tableau des commandes en cours -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Commande</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Client</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody v-for="item of commandEncours " :key="item.id">
                      <tr>
                        <td>
                          <img :src="product.image" :alt="product.name" class="product-image" width="50px"
                            height="50px" />
                          {{item.quantity_command}}x {{ product.name}}
                        </td>
                        <td>
                          <p class="mt-4">{{item.price}} FCFA</p>
                        </td>
                        <td>
                          <p class="mt-4">{{item.nom}}</p>
                        </td>
                        <td>
                          <p class="mt-4">
                            {{item.telephone}}
                          </p>
                        </td>
                        <td>
                          <p class="mt-4">{{ item.adresse }}</p>
                        </td>
                        <td>
                          <p class="mt-4">{{ date(item.updated_at) }}</p>
                        </td>
                        <td>
                          <p class="">
                            <button class="update__btn" style="margin-top: 13px"
                              @click="validerCommand('validée', item.id, item.quantity_command)">Valider</button>
                            <button class="update__btn" style="margin-top: 13px"
                              @click="annulerCommand('annulée',item.id)">Annuler</button>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion validee">
              <input type="radio" name="radio-a" id="check2" class="input">
              <label class="accordion-label" for="check2">Commandes livrées (validées)</label>
              <div class="accordion-content">
                <!-- Tableau des commandes en cours -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Commande</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Client</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody v-for="item of commandValidées " :key="item.id">
                      <tr>
                        <td>
                          <img :src="product.image" :alt="product.name" class="product-image" width="50px"
                            height="50px" />
                          {{item.quantity_command}}x {{ product.name}}
                        </td>
                        <td>
                          <p class="mt-4">{{item.price}} FCFA</p>
                        </td>
                        <td>
                          <p class="mt-4">{{item.nom}}</p>
                        </td>
                        <td>
                          <p class="mt-4">
                            {{item.telephone}}
                          </p>
                        </td>
                        <td>
                          <p class="mt-4">{{ item.adresse }}</p>
                        </td>
                        <td>
                          <p class="mt-4">{{ date(item.updated_at) }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion deux">
              <input type="radio" name="radio-a" class="input" id="check3">
              <label class="accordion-label" for="check3">Entreprise</label>
              <div class="accordion-content">
                <div class="content_btn">
                  <button class="default__btn" data-bs-toggle="modal" data-bs-target="#add" style="margin-top: 13px">
                    Générer un code
                  </button>
                </div>
                <!-- Tableau des codes -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Code</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody v-for="item of codelist" :key="item.id">
                      <tr>
                        <td>
                          <p class="mt-4">{{ item.entreprise }}</p>
                        </td>
                        <td>
                          <p class="mt-4">{{ item.code }}</p>
                        </td>
                        <td>
                          <p class="mt-4">{{ item.telephone }}</p>
                        </td>
                        <td>
                          <p class="mt-4">{{ item.adresse }}</p>
                        </td>
                        <td>
                          <button class="default__btn" style="margin-top: 13px"
                            @click="deleteCode(item.id)">Supprimer</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion trois">
              <input type="radio" name="radio-a" class="input" id="check4">
              <label class="accordion-label" for="check4">Produit</label>
              <div class="accordion-content">
                <!-- Produit -->
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="personal-image">
                        <label class="label">
                          <form action="" method="post" enctype="multipart/form-data">
                            <input type="file" accept="image/jpg, image/jpeg, image/png, image/tiff, image/bmp, image/webp" @change="previewFiles" />
                          </form>
                          <figure class="personal-figure">
                            <img :src="product.image" class="personal-avatar" :alt="product.name">
                            <figcaption class="personal-figcaption">
                              <img
                                src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png">
                            </figcaption>
                          </figure>
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="content-text">
                        <div class="d-flex justify-content-between mb-3">
                          <p>Nom :</p>
                          <p>{{ product.name }}</p>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                          <p>Prix :</p>
                          <p>{{ product.price }} FCFA</p>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                          <p>Poids :</p>
                          <p>{{ product.weight }} kg</p>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                          <p>Quantité :</p>
                          <p v-if="product.quantity > 0" class="instock">{{ product.quantity }}</p>
                          <p v-else class="noinstock">{{ product.quantity }}</p>
                        </div>
                        <div>
                          <p class="mb-3">Description :</p>
                          <p>{{ product.description }}</p>
                        </div>
                        <div>
                          <button class="default__btn" data-bs-toggle="modal" data-bs-target="#update"
                            style="margin-top: 13px">
                            Modifier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />


    <!-- Modal modifier les informations du produit -->
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-white">
            <h5 class="modal-title titre-commande" id="exampleModalLabel">
              Modifier les informations du produit
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="pt-3" v-on:submit.prevent="updateProduct">
              <input type="text" name="name" placeholder="Nom" class="contact__input border" v-model="product.name"
                required />
              <input type="number" name="price" placeholder="Prix" class="contact__input border" v-model="product.price"
                required />
              <input type="number" name="weight" placeholder="Poids" class="contact__input border"
                v-model="product.weight" required />
              <input type="number" name="quantity" placeholder="Quantité" class="contact__input border"
                v-model="product.quantity" required />
              <textarea name="description" id="description" cols="3" rows="5" v-model="product.description"
                class="contact__input border" required></textarea>

              <button type="submit" class="submit default__btn" data-bs-dismiss="modal" aria-label="Close"
                mat-raised-button color="primary">
                Modifer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal modifier les informations du produit -->

    <!-- Modal d'ajout de code entreprise -->
    <div class="modal fade" id="add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-white">
            <h5 class="modal-title titre-commande" id="exampleModalLabel">
              Ajouter un code entreprise
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="pt-3" v-on:submit.prevent="addCode()">
              <input type="text" name="entrprise" class="contact__input border" placeholder="Entreprise"
                v-model="entreprise" required />
              <input type="tel" id="tel" name="tel" placeholder="numéro de téléphone" class="contact__input border"
                @change="onChangeTel($event)" @input="onChangeTel($event)" required v-model="telephone" />
              <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
                Le numéro de téléphone est invalide
              </p>
              <select v-model="adresse" class="contact__input border" required>
                <option disabled value="Choisissez une adresse">Choisissez une adresse</option>
                <option v-for="(item, index) in quartierList" :key="index">
                  {{item.viewValue}}
                </option>
              </select>
              <p class="text-danger" style="font-size: 12px">
                {{ message }}
              </p>
              <button type="submit" class="submit default__btn" mat-raised-button color="primary">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal modifier l'email -->

    <!-- Modal modifier le mot de passe -->
    <!-- <div class="modal fade" id="changepassword" tabindex="-1" aria-labelledby="exampleModalLabel"
      data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-white">
            <h5 class="modal-title titre-commande" id="exampleModalLabel">
              Modifier le mot de passe
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="pt-3" v-on:submit.prevent="changePassword(client.id)">
              <input type="password" id="password" name="password" placeholder="Mot de passe"
                class="contact__input border" @input="onChangePassword($event)" @change="onChangePassword($event)"
                v-model="password" />
              <p class="text-danger" style="font-size: 12px" v-if="!isValidPassword">
                Le mot de passe est invalide
              </p>
              <p class="text-muted" style="font-size: 12px">
                Votre mot de passe doit contenir au moins 6 caractères minimum
                avec une lettre majuscule, une minuscule et des chiffres
              </p>
              <button type="submit" class="submit update__btn" mat-raised-button color="primary" data-bs-dismiss="modal"
                aria-label="Close" :disabled="isDisabledPassword">
                Modifer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div> -->
  </div>

</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import Navbar from "../components/Navbar.vue";
  import Footer from "../components/Footer.vue";
  import Loading from "vue-loading-overlay";
  import Swal from "sweetalert2";
  import constant from "../../constant";
  import axios from "axios";
  // import { formatRelative } from "date-fns";
  // import { fr } from 'date-fns/locale';
  import moment from 'moment';
  import "vue-loading-overlay/dist/vue-loading.css";

  export default {
    name: "Dashboard",
    components: {
      Navbar,
      Footer,
      Loading,
    },
    data() {
      return {
        password: "",
        prenom: "",
        adresse: "",
        nom: "",
        telephone: "",
        email: "",
        message: "",
        description: "",
        image: "",
        entreprise: "",
        numbercode: 0,
        numbercommand: 0,
        gain: 0,
        code: null,
        quantity: null,
        weight: null,
        price: null,
        isLoading: false,
        fullPage: true,
        isValidTel: true,
        isValidEmail: true,
        isValidPassword: true,
        showPassword: false,
        regexPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
        regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        // codelist: [],
        commandValidées: [],
        commandEncours: [],
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
      };
    },
    methods: {
      addCode() {
        if (this.telephone && this.adresse && this.entreprise) {
          this.message = "";
          this.isLoading = true;
          axios.post(
            constant.apiURL + "codes/add", {
              entreprise: this.entreprise,
              telephone: this.telephone,
              adresse: this.adresse
            }
          ).then((response) => {
            if (response.data.id !== null) {
              Swal.fire({
                icon: "success",
                title: "Vous venez d'ajouter un code entreprise avec succès",
                showConfirmButton: true,
              });
              location.reload()
              this.isLoading = false;
            } else {
              this.isLoading = false;
              Swal.fire({
                icon: "error",
                title: "Une erreur est survenue, veuillez réessayer",
                showConfirmButton: true,
              });
            }
          }).catch((error) => {
            this.isLoading = false;
            console.log(error)
            Swal.fire({
              icon: "error",
              title: "Une erreur est survenue, veuillez réessayer",
              showConfirmButton: true,
            });
          });
        } else {
          this.message = "Veuillez remplir tous les champs";
        }
      },
      deleteCode(id) {
        const result = confirm("Etes-vous sûr de supprimer cette entreprise ?");
        if (result) {
          this.isLoading = true;
          axios
            .patch(
              constant.apiURL + "codes/update/" + id, {
                deleted: 1
              }
            ).then((response) => {
              // console.log(response.data);
              if (response.data.id !== null) {
                Swal.fire({
                  icon: "success",
                  title: "Vous avez supprimé l'entreprise " + response.data.entreprise,
                  showConfirmButton: true,
                });
                this.isLoading = false;
              } else {
                console.log("error");
                this.isLoading = false;
              }
            }).catch((error) => {
              this.isLoading = false;
              console.log(error);
            });
        }
      },
      date(date) {
        moment.locale('fr');
        return moment(date).format('l');
      },
      validerCommand(value, id, number) {
        const result = confirm("Etes-vous sûr de valider cette commande ?");
        if (result) {
          this.isLoading = true;
          // Je met à jour le nombre de produit dans la base
          this.product.quantity = this.product.quantity - number;
          // console.log(this.product.quantity);
          axios
            .patch(
              constant.apiURL + "products/update/" + this.product.id, {
                description: this.product.description,
                image: this.product.image,
                name: this.product.name,
                price: this.product.price,
                quantity: this.product.quantity,
                weight: this.product.weight
              }
            ).then((response) => {
              // console.log(response.data);
              if (response.data.id !== null) {
                // Modification de la commande
                axios.patch(constant.apiURL + "commands/update/" + id, {
                    state: value
                  })
                  .then((response) => {
                    // console.log(response.data);
                    if (response.data.id !== null) {
                      Swal.fire({
                        icon: "success",
                        title: "Modification éffectuée avec succès",
                        showConfirmButton: true,
                      });
                      this.isLoading = false;
                    } else {
                      console.log("error");
                      this.isLoading = false;
                    }
                  });
              } else {
                console.log("error");
                this.isLoading = false;
              }
            }).catch((error) => {
              this.isLoading = false;
              console.log(error);
            });
        }
      },
      annulerCommand(value, id) {
        const result = confirm("Etes-vous sûr d'annuler cette commande ?");
        if (result) {
          this.isLoading = true;
          axios.patch(constant.apiURL + "commands/update/" + id, {
              state: value,
              deleted: 1
            })
            .then((response) => {
              // console.log(response.data);
              if (response.data.id !== null) {
                // this.$store.commit('deletedElement',id);
                Swal.fire({
                  icon: "success",
                  title: "Modification éffectuée avec succès",
                  showConfirmButton: true,
                });
                location.reload();
                this.isLoading = false;
              } else {
                console.log("error");
                this.isLoading = false;
              }
            }).catch((error) => {
              this.isLoading = false;
              console.log(error);
            });
        }
      },
      previewFiles(event) {
        console.log(event.target.files);
        if(event.target.files.length > 0) {
          // Contrôler le format de fichier
          if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg'
            || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/tiff'
            || event.target.files[0].type == 'image/webp') {
            // Contrôler la taille du fichier
            if (event.target.files[0].size > 2*1024*1024) {
              alert('Veuillez selectionner une image inférieure à 2Mo.');
            } else {
              this.file = event.target.files[0];
              // console.log(this.file);
              this.uploadFile(this.file);
            }
          }
          else{
            console.log("format incorrect");
            alert("Seules les images de format png, jpg, tiff et webp sont acceptées.");
          }
        }
      },
      uploadFile(file) {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('image',file,file.name);
        axios.post(constant.apiURL + "products/upload/image/" + 2, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then((response) => {
          console.log(response.data);
          if (response.data) {
            Swal.fire({
              icon: "success",
              title: "Modification éffectuée avec succès",
              showConfirmButton: true,
            });
            this.isLoading = false;
          }
        }).catch((error) => {
          this.isLoading = false;
          console.log(error, 'une erreur est survenue');
          alert('une erreur est survenue');
        });
      },
      updateProduct() {
        this.isLoading = true;
        axios
          .patch(
            constant.apiURL + "products/update/" + this.product.id, {
              description: this.product.description,
              image: this.product.image,
              name: this.product.name,
              price: this.product.price,
              quantity: this.product.quantity,
              weight: this.product.weight
            }
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.id !== null) {
              Swal.fire({
                icon: "success",
                title: "Modification éffectuée avec succès",
                showConfirmButton: true,
              });
              this.isLoading = false;
            } else {
              console.log("error");
              this.isLoading = false;
            }
          }).catch((error) => {
            this.isLoading = false;
            console.log(error);
          });
      },
      onChangeTel(e) {
        const numero = e.target.value;
        this.isTelephoneValid(numero);
      },
      isTelephoneValid: function (inputTel) {
        this.isValidTel = this.regexTelephone.test(inputTel);
      },
      // transformMD5: function (pwd) {
      //   let newpwd = md5(pwd);
      //   return newpwd;
      // },
    },
    computed: {
      ...mapGetters(["commandlist"]),
      ...mapGetters(["product"]),
      ...mapGetters(["codelist"]),
    },
    created() {
      /**
       * getCommand renvoi la liste des commandes en général
       */
      this.$store.dispatch("getCommand");
      this.$store.dispatch("getCode");

      /**
       * commandlist représente la liste des commandes en général
       */
      if (this.commandlist) {
        /**
         * commandEncours représente la liste des commandes en cours
         */
        this.commandEncours = this.commandlist.filter(function (element) {
          return element.state === 'en cours';
        });
        // console.log(this.commandEncours, 'commandes en cours')

        /**
         * commandValidee représente la liste des commandes validée
         */
        this.commandValidee = this.commandlist.filter(function (element) {
          return element.state === 'validée';
        });
        this.numbercommand = this.commandValidee.length;
        this.commandValidées = this.commandValidee;
        // console.log(this.numbercommand, 'commandes validées')
        // console.log(this.commandValidées, 'liste des commandes validées')

        /**
         * Calcul du gain sur toutes les ventes
         */
        this.commandValidee.forEach(element => {
          // console.log(element.price)
          this.gain = element.price + this.gain;
          // console.log(this.gain)
        });
      }

      if (this.codelist) {
        this.numbercode = this.codelist.length;
        // console.log(this.numbercode);
        // this.codelist = JSON.parse(localStorage.getItem("codes"));
        // console.log(this.codelist);
      }

      // if (localStorage.getItem("product")) {
      //   this.product = JSON.parse(localStorage.getItem("product"));
      //   // console.log(this.codelist);
      // }
    },
    mounted() {},
  };
</script>

<style scoped>
  /* Image du produit */

  .indicateur_titre {
    font-weight: bold;
    font-size: 20px;
  }

  .personal-image {
    text-align: center;
  }

  .personal-image input[type="file"] {
    display: none;
  }

  .personal-figure {
    position: relative;
    width: 300px;
    height: 300px;
  }

  .personal-avatar {
    cursor: pointer;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    border-radius: 100%;
    border: 2px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    transition: all ease-in-out .3s;
  }

  .personal-avatar:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }

  .personal-figcaption {
    cursor: pointer;
    position: absolute;
    top: 0px;
    width: inherit;
    height: inherit;
    border-radius: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all ease-in-out .3s;
  }

  .personal-figcaption:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, .5);
  }

  .personal-figcaption>img {
    margin-top: 130px;
    width: 50px;
    height: 50px;
  }

  /* ===================== */

  .stat {
    font-weight: 800;
    font-size: 36px;
  }

  .indicateur_container {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .bd-grid {
    display: grid;
    gap: 1.5rem;
  }

  .indicateur {
    padding: 10%;
    box-shadow: 0 2px 6px rgba(65, 11, 16, .15);
    height: auto;
  }

  .content_btn {
    width: 200px;
    margin-bottom: 20px;
  }

  .content-text {
    margin-top: 30px;
  }

  #moncompte {
    margin-top: 130px;
    margin-bottom: 100px;
  }

  .titre {
    margin-bottom: 30px;
  }

  .titre-profil {
    font-weight: 600;
  }

  .titre-profil a {
    color: black;
  }

  .titre-profil a:hover {
    color: hsl(174, 63%, 40%);
  }

  .update__btn {
    background-color: black;
    color: #fff;
    padding: 0.8rem 0.8rem;
    border: 1px solid black;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 15px;
    width: 80px;
    outline: none;
    margin-right: 10px;
  }

  .update__btn:hover {
    transition: 0.5s;
    background-color: #202122;
    color: #fff;
  }

  .modal-content {
    padding: 5%;
  }

  .block {
    margin-top: 10px;
    padding: 4%;
    box-shadow: 0 2px 6px rgba(65, 11, 16, 0.15);
    /* width: 300px; */
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

  .accordion-content p {
    margin: 0;
    color: rgba(4, 57, 94, .7);
    font-size: 18px;
  }

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

    #moncompte {
      margin-top: 50px;
    }
  }
</style>