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
    medecinDate: [],
    medecinMotif: []
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
    },
    medecinMotif(state) {
      return state.medecinMotif;
    }
  },
  actions: {
    // Déconnexion
    logout({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_PATIENT", null);
      commit("SET_AUTHENTICATED", false);
    },
    // Récupération d'un patient par Id
    getPatientById({ commit }, id) {
      // const token = this.state.token;
      const token = localStorage.getItem('token');
      return new Promise((resolve, reject) => {
        axios.get(constant.apiURL + 'patients/' + id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // traiter la réponse
          // commit('SET_AUTHENTICATED', true);
          // commit('SET_TOKEN', token);
          commit('SET_PATIENT', response.data);
          resolve(response.data);
        })
        .catch(error => {
          // traiter l'erreur
          reject(error);
          // console.log(error)
        });
      });
    },
    // Récupération d'un patient par email
    getPatientByEmail({ commit }, email) {
      // const token = this.state.token;
      const token = localStorage.getItem('token');
      return new Promise((resolve, reject) => {
        axios.get(constant.apiURL + 'patients/email/' + email, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // traiter la réponse
          commit('SET_AUTHENTICATED', true);
          commit('SET_TOKEN', token);
          commit('SET_PATIENT', response.data);
          resolve(response.data);
        })
        .catch(error => {
          // traiter l'erreur
          reject(error);
          // console.log(error)
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
      // console.log(id)
      axios.get(constant.apiURL + 'medecins/'+ id +'?date=true&hour=true')
      .then(response => {
        // traiter la réponse
        const medecinDate = response.data.dateMedecin;
        
        commit('SET_MEDECINDATE', medecinDate);
      })
      .catch(error => {
        // traiter l'erreur
        console.log(error)
      });
    },
    // Récupération des motifs d'un médecin
    getMotifMedecin({ commit }, id) {
      // console.log(id)
      const token = this.state.token;
      axios.get(constant.apiURL + 'medecins/'+ id +'/motifs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // traiter la réponse
        const medecinMotifs = response.data.content;
        // console.log(medecinMotifs, "motifs")
        commit('SET_MEDECINMOTIF', medecinMotifs);
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
    },
    SET_MEDECINMOTIF(state, medecinMotif) {
      state.medecinMotif = medecinMotif
    }
  },
});
