import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import constant from "../../constant";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
  state: {
    isAuthenticated: false,
    token: null,
    patient: null,
    medecin: null,
    medecinList: [],
    medecinDate: []

  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    token(state) {
      return state.token;
    },
    patient(state) {
      return state.patient;
    },
    getMedecinById: (state) => (id) => {
      return state.medecinList.filter(user => user.id === id)[0]
    },
    medecin(state) {
      return state.medecin;
    },
    medecinList(state) {
      return state.medecinList;
    },
    medecinDate(state) {
      return state.medecinDate;
    }
  },
  actions: {
    // Authentification
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(constant.apiURL + 'login', credentials)
          .then(response => {
            console.log(response, "authenticated")
            const token = response.data.accessToken;
            const email = response.data.email;
            localStorage.setItem('token', token);
            localStorage.setItem('emailUser', email);
            commit('SET_AUTHENTICATED', true);
            commit('SET_TOKEN', token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // Déconnexion
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(constant.apiURL + 'logout')
          .then(response => {
            console.log(response)
            localStorage.removeItem('token');
            localStorage.removeItem('emailUser');
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
            commit("SET_AUTHENTICATED", false);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // Récupération d'un patient par email
    getPatientByEmail({ commit }, email) {
      const token = this.state.token;
      return new Promise((resolve, reject) => {
        axios.get(constant.apiURL + 'patients/email/' + email, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // traiter la réponse
          const patient = response.data;
          commit('SET_PATIENT', patient);
          resolve(response.data);
        })
        .catch(error => {
          // traiter l'erreur
          reject(error);
          console.log(error)
        });
      });
    },
    // Récupération d'un médecin par ID
    getMedecinById({ commit }, id) {
      const token = this.state.token;
      return new Promise((resolve, reject) => {
        axios.get(constant.apiURL + 'medecins/' + id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // traiter la réponse
          const medecin = response.data;
          commit('SET_MEDECIN', medecin);
          resolve(response.data);
        })
        .catch(error => {
          // traiter l'erreur
          reject(error);
          console.log(error)
        });
      });
    },
    // Récupération des médecins généralistes
    getMedecinGeneraliste({ commit }) {
      axios.get(constant.apiURL + 'medecins?'+'specialite=Médecin généraliste')
      .then(response => {
        // traiter la réponse
        const medecinList = response.data.content;
        // console.log(medecinList, "liste depuis store généraliste")
        commit('SET_MEDECINLIST', medecinList);
      })
      .catch(error => {
        // traiter l'erreur
        console.log(error)
      });
    },
    // Récupération des médecins par spécialité
    getMedecinByCat({ commit }, credential) {
      axios.get(constant.apiURL + 'medecins',  { params: credential })
      .then(response => {
        // traiter la réponse
        const medecinList = response.data.content;
        // console.log(medecinList, "liste depuis store")
        commit('SET_MEDECINLIST', medecinList);
      })
      .catch(error => {
        // traiter l'erreur
        console.log(error)
      });
    },
    // Récupération des médecins par spécialité & par ville
    getMedecinByCatAndCity({ commit }, {specialite, ville}) {
      console.log(specialite, ville)
      axios.get(constant.apiURL + 'medecins?'+'specialite='+specialite+'&ville='+ville)
      .then(response => {
        // traiter la réponse
        const medecinList = response.data.content;
        // console.log(medecinList, "resultat de la recherche")
        commit('SET_MEDECINLIST', medecinList);
      })
      .catch(error => {
        // traiter l'erreur
        console.log(error)
      });
    },
    // Récupération des dates du médecin
    getDateMedecin({ commit }, id) {
      console.log(id)
      axios.get(constant.apiURL + 'medecins/'+ id +'?date=true&hour=true')
      .then(response => {
        // traiter la réponse
        const medecinDate = response.data.dateMedecin;
        console.log(medecinDate, "resultat")
        commit('SET_MEDECINDATE', medecinDate);
      })
      .catch(error => {
        // traiter l'erreur
        console.log(error)
      });
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, authenticated) {
      state.isAuthenticated = authenticated;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_PATIENT(state, patient) {
      state.patient = patient;
    },
    SET_MEDECIN(state, medecin) {
      state.medecin = medecin;
    },
    SET_MEDECINLIST(state, medecinList) {
      state.medecinList = medecinList
    },
    SET_MEDECINDATE(state, medecinDate) {
      state.medecinDate = medecinDate
    }
  },
});
