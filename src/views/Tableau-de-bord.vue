<template>
    <div class="tableau-de-bord">
        <!--========== SPINNER ==========-->
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <Patientnav />
        <div class="banner">
            <div class="content section">
                <!-- Disponibilités sur Brazzaville et Pointe-noire -->
                <div class="info-profil">
                    <div class="banniere-profil" style="height: 60px;">
                        <Avatar />
                    </div>
                    <div class="text-center">
                        <h1 class="name">{{patient.prenom}} <span class="uppercase">{{patient.nom}}</span> </h1>
                        <a class="supprimer">Supprimer mon compte</a>
                    </div>
                </div>
                <div class="row">
                    <!-- Dossier Médical -->
                    <div class="col-md-6">
                        <div class="info-dossier">
                            <div class="banniere-standard" style="height: 60px;">
                                <span class="titre-dossier">Dossier médical</span>
                            </div>
                        </div>
                        <div class="content-dossier">
                            <form v-on:submit.prevent="AjouterFiche" class="">
                                <div class="content-fiche">
                                    <p class="sous-titre">Fiche médicale</p>
                                    <!-- Problème médical -->
                                    <div style="display: block;">
                                        <div class="form-content-label">
                                            <label class="form-label-fiche">
                                                <span>Problème médical</span>
                                            </label>
                                        </div>
                                        <div class="form-content-input-fiche">
                                            <span class="icon-label">
                                                <i class='bx bx-calendar'></i>
                                            </span>
                                            <div class="simple">
                                                <textarea type="text" id="pbm" name="pbm" rows="5" cols="6"
                                                    class="form-input-fiche" required
                                                    v-model="problemeMedical"></textarea>
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Note médical -->
                                    <div style="display: block;">
                                        <div class="form-content-label">
                                            <label class="form-label-fiche">
                                                <span>Note médical</span>
                                            </label>
                                        </div>
                                        <div class="form-content-input-fiche">
                                            <span class="icon-label">
                                                <i class='bx bx-calendar'></i>
                                            </span>
                                            <div class="simple">
                                                <textarea type="text" id="pbm" name="pbm" rows="5" cols="6"
                                                    class="form-input-fiche" required v-model="noteMedical"></textarea>
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Allergie et Reaction -->
                                    <div style="display: block;">
                                        <div class="form-content-label">
                                            <label class="form-label-fiche">
                                                <span>Allergie et Reaction</span>
                                            </label>
                                        </div>
                                        <div class="form-content-input-fiche">
                                            <span class="icon-label">
                                                <i class='bx bx-calendar'></i>
                                            </span>
                                            <div class="simple">
                                                <textarea type="text" id="pbm" name="pbm" rows="5" cols="6"
                                                    class="form-input-fiche" required
                                                    v-model="allergieReaction"></textarea>
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Mon traitement -->
                                    <div style="display: block;">
                                        <div class="form-content-label">
                                            <label class="form-label-fiche">
                                                <span>Mon traitement</span>
                                            </label>
                                        </div>
                                        <div class="form-content-input-fiche">
                                            <span class="icon-label">
                                                <i class='bx bx-calendar'></i>
                                            </span>
                                            <div class="simple">
                                                <textarea type="text" id="pbm" name="pbm" rows="5" cols="6"
                                                    class="form-input-fiche" required v-model="traitement"></textarea>
                                            </div>
                                        </div>
                                    </div> <br>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <!-- Taille -->
                                            <div style="display: block;">
                                                <div class="form-content-label">
                                                    <label class="form-label-fiche">
                                                        <span>Taille (cm)</span>
                                                    </label>
                                                </div>
                                                <div class="form-content-input-fiche">
                                                    <div class="simple">
                                                        <input type="number" min="0" max="300" name="taille"
                                                            class="form-input-fiche" required v-model="taille" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <!-- Poids -->
                                            <div style="display: block;">
                                                <div class="form-content-label">
                                                    <label class="form-label-fiche">
                                                        <span>Poids (Kg)</span>
                                                    </label>
                                                </div>
                                                <div class="form-content-input-fiche">
                                                    <div class="simple">
                                                        <input type="number" min="0" max="800" name="poids"
                                                            class="form-input-fiche" required v-model="poids" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> <br>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <!-- Groupe Sanguin -->
                                            <div style="display: block;">
                                                <div class="form-content-label">
                                                    <label class="form-label-fiche">
                                                        <span>Groupe Sanguin</span>
                                                    </label>
                                                </div>
                                                <div class="form-content-input-fiche">
                                                    <div class="simple">
                                                        <select v-model="groupeSanguin" required name="groupeSanguin"
                                                            placeholder="Groupe sanguin" class="form-input">
                                                            <option v-for="(item, index) in groupesanguinList"
                                                                :key="index" :value="item.viewValue">
                                                                {{item.viewValue}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <!-- Groupe Sanguin -->
                                            <div style="display: block;">
                                                <div class="form-content-label">
                                                    <label class="form-label-fiche">
                                                        <span>IMC</span>
                                                    </label>
                                                </div>
                                                <div class="form-content-input-fiche">
                                                    <div class="simple">
                                                        <input type="number" readonly name="poids"
                                                            class="form-input-fiche" v-model="calculimc" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-success mt-3" style="font-size: 12px">
                                    {{message}}
                                </p>
                                <div class="content__btn mt-3">
                                    <input type="submit" value="Sauvegarder" name="submit" class="default__btn" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- Mes informations -->
                    <div class="col-md-6">
                        <div class="info-profil">
                            <div class="banniere-standard" style="height: 60px;">
                                <span class="titre-information">Mes informations</span>
                            </div>
                            <div class="content-information">
                                <form v-on:submit.prevent="updatePatient">
                                    <!-- Nom -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Nom</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <input type="text" id="nom" name="nom" placeholder="Nom"
                                                    class="form-input" required v-model="patient.nom" />
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Prénom -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Prénom</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <input type="text" id="nom" name="nom" placeholder="Prénom"
                                                    class="form-input" required v-model="patient.prenom" />
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Adresse e-mail -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Adresse e-mail</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <input type="email" id="email" name="email" placeholder="Adresse e-mail"
                                                    @change="onChangeEmail($event)" @input="onChangeEmail($event)"
                                                    class="form-input" required v-model="patient.email" />
                                            </div>
                                            <p class="text-danger" style="font-size: 12px" v-if="!isValidEmail">
                                                L'email est invalide
                                            </p>
                                        </div>
                                    </div> <br>
                                    <!-- Téléphone -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Téléphone</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <input type="tel" id="tel" name="tel" placeholder="Téléphone"
                                                    @change="onChangeTel($event)" @input="onChangeTel($event)"
                                                    pattern="^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$" class="form-input"
                                                    required v-model="patient.telephone" />
                                            </div>
                                            <p class="text-danger" style="font-size: 12px" v-if="!isValidTel">
                                                Le numéro de téléphone est invalide
                                            </p>
                                        </div>
                                    </div> <br>
                                    <!-- Adresse -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Adresse</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <input type="text" id="tel" name="tel" placeholder="Adresse"
                                                    class="form-input" v-model="patient.address" />
                                            </div>
                                            <div class="simple">
                                                <input type="text" id="tel" name="tel" placeholder="Ville"
                                                    class="form-input" v-model="patient.city" />
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Date de naissance -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Date de naissance</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <span class="icon-label">
                                                <i class='bx bx-calendar'></i>
                                            </span>
                                            <div class="simple">
                                                <input type="date" id="date" name="date" class="form-input"
                                                    v-model="patient.birthday" />
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Genre -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Sexe</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <select v-model="patient.gender" name="gender" placeholder="Sexe"
                                                    class="form-input">
                                                    <option disabled value="">Choisissez un genre</option>
                                                    <option v-for="(item, index) in genderList" :key="index"
                                                        :value="item.viewValue">
                                                        {{item.viewValue}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> <br>
                                    <!-- Profession -->
                                    <div class="form-inline">
                                        <div class="form-content-label">
                                            <p class="form-label">
                                                <span>Profession</span>
                                            </p>
                                        </div>
                                        <div class="form-content-input">
                                            <div class="simple">
                                                <select v-model="patient.profession" name="profession"
                                                    placeholder="Profession" class="form-input">
                                                    <option disabled value="">Choisissez une profession</option>
                                                    <option v-for="(item, index) in professionList" :key="index"
                                                        :value="item.viewValue">
                                                        {{item.viewValue}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-success mt-3" style="font-size: 12px">
                                        {{messagePatient}}
                                    </p>
                                    <div class="content__btn mt-3">
                                        <input type="submit" value="Sauvegarder" name="submit" class="default__btn" />
                                    </div>
                                </form>
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
    import {
        mapGetters
    } from "vuex";
    import Loading from "vue-loading-overlay";
    import Patientnav from "@/components/Patientnav.vue";
    import Footer from "@/components/Footer.vue";
    import Avatar from "@/components/Avatar.vue";
    import constant from '../../constant';
    import axios from 'axios';
    export default {
        name: "Tableau-de-bord",
        components: {
            Patientnav,
            Avatar,
            Loading,
            Footer
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                isconnected: false,
                isValidEmail: true,
                isValidTel: true,
                genderList: [{
                        value: '1',
                        viewValue: 'MASCULIN'
                    },
                    {
                        value: '2',
                        viewValue: 'FEMININ'
                    }
                ],
                professionList: [{
                        value: '1',
                        viewValue: 'Agriculteur'
                    },
                    {
                        value: '2',
                        viewValue: 'Artisan'
                    },
                    {
                        value: '3',
                        viewValue: 'Salarié'
                    },
                    {
                        value: '4',
                        viewValue: 'Salarié cadre'
                    },
                    {
                        value: '5',
                        viewValue: 'Commerçant'
                    },
                    {
                        value: '6',
                        viewValue: 'Fonctionnaire'
                    },
                    {
                        value: '7',
                        viewValue: 'Enseignant'
                    },
                    {
                        value: '8',
                        viewValue: 'Etudiant'
                    },
                    {
                        value: '9',
                        viewValue: 'Chef d\'entreprise'
                    },
                    {
                        value: '10',
                        viewValue: 'Profession libérale'
                    },
                    {
                        value: '11',
                        viewValue: 'Retraité'
                    },
                    {
                        value: '12',
                        viewValue: 'Sans profession'
                    },
                    {
                        value: '13',
                        viewValue: 'Autre'
                    },
                ],
                groupesanguinList: [{
                        value: '1',
                        viewValue: 'A +'
                    },
                    {
                        value: '2',
                        viewValue: 'A -'
                    },
                    {
                        value: '3',
                        viewValue: 'B +'
                    },
                    {
                        value: '4',
                        viewValue: 'B -'
                    },
                    {
                        value: '5',
                        viewValue: 'AB +'
                    },
                    {
                        value: '6',
                        viewValue: 'AB -'
                    },
                    {
                        value: '7',
                        viewValue: 'O +'
                    },
                    {
                        value: '8',
                        viewValue: 'O -'
                    }
                ],
                gender: "",
                // Fiche
                problemeMedical: "Aucun",
                noteMedical: "Aucun",
                allergieReaction: "Aucune",
                traitement: "Aucun",
                poids: 0,
                taille: 0,
                groupeSanguin: "",
                imc: 0,
                message: "",
                messagePatient: "",
                regexEmail: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                regexTelephone: /^0[1456][ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                // redirect to the login page
            },
            async AjouterFiche() {
                this.isLoading = true;
                if (this.patient.fiche !== null) {
                    // Si la fiche existe déjà on la modifie
                    this.updateFiche();
                } else {
                    try {
                        const token = localStorage.getItem("token");

                        const response = await axios.post(constant.apiURL + 'fiches', {
                            problemeMedical: this.problemeMedical,
                            noteMedical: this.noteMedical,
                            allergieReaction: this.allergieReaction,
                            traitement: this.traitement,
                            poids: this.poids,
                            taille: this.taille,
                            groupeSanguin: this.groupeSanguin,
                            status: "status",
                            etat: "etat",
                            patient: this.patient
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        console.log(response);

                        if (response.data.code === 200 || response.data.code === 201) {
                            this.$store.dispatch('getPatientById', this.patient.id);
                            this.message = "Votre modification a bien été prise en compte";
                            this.isLoading = false;
                        }
                    } catch (error) {
                        console.log(error);
                        this.isLoading = false;
                    }
                }
            },
            async updateFiche() {
                try {
                    const token = localStorage.getItem("token");

                    const response = await axios.post(constant.apiURL + 'fiches/' + this.patient.fiche.id, {
                        problemeMedical: this.problemeMedical,
                        noteMedical: this.noteMedical,
                        allergieReaction: this.allergieReaction,
                        traitement: this.traitement,
                        poids: this.poids,
                        taille: this.taille,
                        groupeSanguin: this.groupeSanguin,
                        status: "status",
                        etat: "etat",
                        patient: this.patient
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log(response);

                    if (response.data.code === 200 || response.data.code === 201) {
                        this.$store.dispatch('getPatientById', this.patient.id);
                        this.message = "Votre modification a bien été prise en compte";
                        this.isLoading = false;
                    }
                } catch (error) {
                    console.log(error);
                    this.isLoading = false;
                }
            },
            async updatePatient() {
                this.isLoading = true;
                const genderMaj = this.patient.gender.toUpperCase();
                const nomMaj = this.patient.nom.toUpperCase();
                try {
                    const token = localStorage.getItem("token");

                    const response = await axios.patch(constant.apiURL + 'patients/' + this.patient.id, {
                        email: this.patient.email,
                        username: this.patient.username,
                        nom: nomMaj,
                        prenom: this.patient.prenom,
                        birthday: this.patient.birthday,
                        description: this.patient.description,
                        telephone: this.patient.telephone,
                        city: this.patient.city,
                        address: this.patient.address,
                        profession: this.patient.profession,
                        gender: genderMaj
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log(response);

                    if (response.data.code === 200 || response.data.code === 201) {
                        this.$store.dispatch('getPatientById', this.patient.id);
                        this.messagePatient = "Votre modification a bien été prise en compte";
                        this.isLoading = false;
                    }
                } catch (error) {
                    console.log(error);
                    this.isLoading = false;
                }
            },
            onChangeTel(e) {
                const numero = e.target.value;
                this.isTelephoneValid(numero);
            },
            isTelephoneValid: function (inputTel) {
                this.isValidTel = this.regexTelephone.test(inputTel);
            },
            onChangeEmail(e) {
                const textemail = e.target.value;
                this.isEmailValid(textemail);
            },
            isEmailValid: function (inputEmail) {
                this.isValidEmail = this.regexEmail.test(inputEmail);
            },
        },
        computed: {
            ...mapGetters(['patient']),
            isAuthenticated() {
                return this.$store.getters.isAuthenticated; // accéder à la valeur du getters
            },
            calculimc() {
                return Math.round(this.poids / Math.pow(this.taille / 100, 2));
            }
        },
        mounted() {

            if (this.patient.fiche !== null) {
                this.problemeMedical = this.patient.fiche.problemeMedical;
                this.noteMedical = this.patient.fiche.noteMedical;
                this.allergieReaction = this.patient.fiche.allergieReaction;
                this.poids = this.patient.fiche.poids;
                this.taille = this.patient.fiche.taille;
                this.groupeSanguin = this.patient.fiche.groupeSanguin;
            }
        },
    }
</script>

<style scoped>
    .form-label-fiche {
        transition: all 0.2s ease 0s;
        color: rgb(173, 173, 179);
        font-family: BasisGrotesque, sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        margin: 0px;
        padding: 0px 0px 8px;
        display: block;
        pointer-events: none;
        position: relative;
        transform-origin: left center;
        transform: translateY(0px) scale(1);
        width: 100%;
    }

    select {
        border: none;
        width: 100%;
        outline: none;
    }

    textarea {
        border: none;
        width: 100%;
        outline: none;
    }

    .icon-label {
        height: 24px;
        position: absolute;
        pointer-events: none;
        right: 0px;
        top: 0px;
        width: 24px;
        font-weight: bold;
    }

    .form-input-fiche {
        font-family: 'BasisGrotesque', sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 18px;
        line-height: 24px;
        color: rgb(52, 52, 67);
        margin: 0px;
        padding: 0px;
        display: block;
        appearance: textfield;
        background-color: transparent;
        border: none;
        height: 24px;
        transition: all 0.2s ease 0.1s;
        width: 100%;
    }

    input {
        border: none;
        width: 100%;
        border-radius: 0;
        outline: none;
    }

    .default__btn {
        border-radius: 10px;
    }

    .form-input {
        padding: 0 8px;
    }

    .simple {
        border-bottom: 1px solid gray;
        padding-bottom: 4px;
    }

    .form-content-input {
        background-color: hsla(0, 0%, 100%, .7);
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 100px);
    }

    .form-label,
    .form-inline {
        display: inline-block;
        font-weight: 400;
        margin: 0;
        vertical-align: middle;
        width: 100px;
    }

    .form-inline {
        align-items: center;
        display: flex;
        flex-flow: row wrap;
        width: 100%;
    }

    .name {
        margin-top: 60px;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .titre-dossier,
    .titre-information {
        color: #fff;
        font-size: 22px;
        font-weight: 500;
    }

    .content-information,
    .content-dossier {
        padding: 15px;
        background-color: #fff;
        margin-bottom: 25px;
    }

    .supprimer {
        color: red;
        cursor: pointer;
    }

    .supprimer:hover {
        text-decoration: underline;
    }

    .info-profil {
        color: black;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 30px;
    }

    .info-dossier {
        color: black;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 30px;
    }

    .banniere-profil {
        background-color: #4f74da;
        border-radius: 10px 10px 0% 0%;
        text-align: center;
        z-index: 1;
    }

    .banniere-standard {
        background-color: #4f74da;
        border-radius: 10px 10px 0% 0%;
        padding: 15px;
    }
</style>