<template>
    <div class="v-catalog-item">
        <img class="v-catalog-item__image" v-bind:src=" 'https://www.ferti-organic.com/theme/img/' + productData.image" alt="img">
        <p class="v-catalog-itemName">{{productData.name}}</p>
        <p class="v-catalog-itemPrice">Price: {{productData.price}}</p>
        <button class="v-catalog-itemAddCart btn" 
        @click="addToCart">Add to cart</button>
    </div>
</template>

<script>
export default {
    name: "v-catalog-item",
    props: {
      productData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
        return {}
    },
    computed: {},
    methods: {
      addToCart() {
        this.$emit( 'addToCart', this.productData)
      }
    },
}
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    width: 150px;
    &__image {
      width: 200px;
      height: 125px;
    }
  }
</style>