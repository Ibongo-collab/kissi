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
    user: null
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
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
    // Récupération d'un utilisateur par email
    getUserByEmail({ commit }, email) {
      const token = localStorage.getItem('token');
      console.log(token, "token")
      return new Promise(( resolve, reject) => {
        axios.post(constant.apiURL + 'patients/email/'+ email,
        {
          headers: {
            Authorization: `${token}`
          }
        })
          .then(response => {
            console.log(response, "user")
            const user = response.data.user;
            commit('SET_USER', user);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error)
          });
      });
    },
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
  },
  mutations: {
    SET_AUTHENTICATED(state, authenticated) {
      state.isAuthenticated = authenticated;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
});
