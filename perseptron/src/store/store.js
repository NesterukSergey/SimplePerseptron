import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//Modules
import trainingData from "./modules/trainingData";

export const store = new Vuex.Store({
  modules: {
    trainingData
  },
  state: {

  },
  getters: {},
  mutations: {},
  actions: {}
});
