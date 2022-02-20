<template>
  <div class="v-cart-item">
    <img class="v-cart-item__image" :src=" 'https://www.ferti-organic.com/theme/img/' + cartItemData.image" alt="">
    <div class="v-cart-item__info">
      <p>{{cartItemData.name}}</p>
      <p>{{cartItemData.price}}</p>
      <p>{{cartItemData.article}}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Qty:</p>
      <span>
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{cartItemData.quantity}}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
      </div>
      <button @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>


export default {
  name: "v-cart-item",
  props: {
    cartItemData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      
    }
  },
  computed: {},
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
    this.$set(this.cartItemData, 'quantity', 1)
  },
}
</script>

<style lang="scss">
  .v-cart-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    box-shadow: 0 0 8px 0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      max-width: 50px;
      
    }
    .quantity__btn {
      cursor: pointer;
    }
  }


</style>