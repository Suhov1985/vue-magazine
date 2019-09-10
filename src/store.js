import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        buyProducts: []
    },
    mutations: {
        buyProductsInit(state, payload) {
            state.buyProducts = payload
        },
        addProductToCard(state, payload) {
            localStorage.cart = JSON.stringify(payload)
            state.buyProducts = JSON.parse(localStorage.cart)
        }
    },
    actions: {}
})
