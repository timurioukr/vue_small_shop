import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store ({
  state: {
    isMobile: false,
    isDesktop: true,
    products: [ {
      "name": "Fertilizers",
      "article": "1",
      "price": "155",
      "image": "bg4-4.png",
      "category": "Categori 1"
    },{
      "name": "Fertilizers Super1",
      "article": "2",
      "price": "275",
      "image": "bg4-9.png",
      "category": "Categori 1"
    },{
      "name": "Fertilizers+",
      "article": "3",
      "price": "115",
      "offer": "BOGOF",
      "image": "bg4-2.png",
      "category": "Categori 2"
    },{
      "name": "FertilizersPro",
      "article": "4",
      "price": "250",
      "image": "bg4-9.png",
      "category": "Categori 2"
    },{
      "name": "FertilizersMaster",
      "article": "5",
      "price": "150",
      "image": "bg4-3.png",
      "category": "Categori 2"
    },{
      "name": "FertilizersMasterPro",
      "article": "6",
      "price": "30",
      "image": "bg4-10.png",
      "category": "Categori 1"
    }],
    cart: []
  },
  mutations: {
    SWITCH_MOBILE: (state) => {
      state.isMobile = true;
      state.isDesktop = false;
    },
    SWITCH_DESKTOP: (state) => {
      state.isMobile = false;
      state.isDesktop = true;
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, product) => {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.map(function(item) {
          if (item.article === product.article) {
            isProductExists = true;
            item.quantity++
          }
        })
        if (!isProductExists) {
          state.cart.push(product)

        }
      } else {
        state.cart.push(product)
      }
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1)
    },
    INCREMENT: (state, index) => {
      state.cart[index].quantity++
    },
    DECREMENT: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--
      }
    }

  },
  actions: {
    SET_MOBILE({commit}) {
      commit('SWITCH_MOBILE')
    },
    SET_DESKTOP({commit}) {
      commit('SWITCH_DESKTOP')
    },
    GET_PRODUCTS_FROM_API({commit}) {
      return axios('http://localhost:3000/products', {
        method: "GET"
      })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data);
          return products
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    ADD_TO_CART({commit}, product) {
      commit('SET_CART', product)
    },
    INCREMENT_CART_ITEM({commit}, index) {
      commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
      commit('DECREMENT', index)
    },
    DELETE_FROM_CART({commit}, index) {
      commit('REMOVE_FROM_CART', index)
    }
  },
  getters: {
    IS_MOBILE(state) {
      return state.isMobile
    },
    IS_DESKTOP(state) {
      return state.isDesktop
    },
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    }
  }
});

export default store;