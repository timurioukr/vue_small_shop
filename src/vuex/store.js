import Vue from 'vue'
//import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store ({
  state: {
    products: [],
    cart: []
  },
  mutations: {
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
    GET_PRODUCTS_FROM_API({ commit }) {
      const products = [{image:'1.png', price: 10, name: 'test1', article:1}, {image:'2.png', price: 100, name: 'test2', article:2}]
      commit('SET_PRODUCTS_TO_STATE', products);
      return products
      // return axios('http://localhost:3000/products', {
      //   method: "GET"
      // })
      //   .then((products) => {
      //     commit('SET_PRODUCTS_TO_STATE', products.data);
      //     return products
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     return error
      //   })
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
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    }
  }
});

export default store;