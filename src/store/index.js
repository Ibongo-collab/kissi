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
    client: null,
    product: null,
    commandlist: [],
    codelist: []
  },
  getters: {
    client: (state) => state.client,
    product: (state) => state.product,
    commandlist: (state) => state.commandlist,
    codelist: (state) => state.codelist,
  },
  actions: {
    getUser({ commit, state }) {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        axios
          .get(
            constant.apiURL +
              "client/telephone/" +
              localStorage.getItem("userTelephone"),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              // console.log(response.data);
              commit("SET_CLT", response.data);
              localStorage.setItem("id", response.data.id);
            } else {
              // console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return localStorage.setItem("empty", state.client);
      }
    },
    getProduct({ commit }) {
      axios.get(constant.apiURL + "products/getproduct/" + 2).then((response) => {
        if (response.data.id !== null) {
          // console.log(response.data)
          localStorage.setItem("product",JSON.stringify(response.data));
          commit("SET_PDT", response.data);
        } else {
          console.log("error");
        }
      })
    },
    getCommand({ commit }) {
        axios.get(constant.apiURL + "commands/getall")
        .then((response) => {
          if (response.status == 200) {
            // console.log(response.data);
            commit("SET_CMD", response.data);
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getCode({ commit }) {
      axios.get(constant.apiURL + "codes/getall")
      .then((response) => {
        if (response.status == 200) {
          // console.log(response.data);
          localStorage.setItem("codes",JSON.stringify(response.data));
          commit("SET_CDE", response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    logOutClient({ commit }) {
      commit("SET_CLT", null);
    },
  },
  mutations: {
    SET_CLT(state, client) {
      state.client = client;
    },
    SET_PDT(state, product) {
      state.product = product;
    },
    SET_CMD(state, command) {
      state.commandlist = command;
    },
    SET_CDE(state, code) {
      state.codelist = code;
    },
  },
});
