<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}">
      <div class="v-catalog__link_to_cart">Back to catalog:</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cartData.length">There are not a products in cart...</p>
    <vCartItem 
			v-for="(item, index) in cartData"
			:key="item.article"
			:cartItemData="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
		/>
    <div class="v-cart__total">
      <p class="total__name">Total:</p>
      <p>{{cartTotalCost}}$</p>
    </div>
  </div>
</template>

<script>
import vCartItem from "./v-cart-item";
import {mapActions} from 'vuex'

export default {
  name: "v-cart",
  components: {
    vCartItem,
  },
  props: {
		cartData: {
			type: Array,
			default() {
				return []
			}
		}
	},
  data() {
    return {};
  },
  computed: {
    cartTotalCost() {
      let result = []

      if(this.cartData.length) {
        for (let item of this.cartData ) {
        result.push(item.price * item.quantity) 
      }

      result = result.reduce(function(sum, el) {
        return sum + el
      })
        return result
      } else {
        return 0
      }
    }
  },
  methods: {
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    },
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM'

    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)

    }
  }
};
</script>

<style lang="scss">
  .v-cart {
    margin-bottom: 100px;
    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 1vh;
      display: flex;
      justify-content: center;
      background: rgb(31, 0, 117);
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
    .total__name {
      margin-right: $margin*2;
    }
  }
</style>