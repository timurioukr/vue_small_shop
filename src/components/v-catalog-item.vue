<template>
    <div class="v-catalog-item">
      <v-popup 
        v-if="isInfoPopup"
        @closePopup="closePopup"
        rightButtonTitle="Add to cart"
        @action="addToCart"
      :popupName="productData.name"
      >
        <img class="v-catalog-item__image" v-bind:src=" 'https://www.ferti-organic.com/theme/img/' + productData.image" alt="img">
        <p class="v-catalog-itemName">{{productData.name}}</p>
        <p class="v-catalog-itemPrice">Price: {{productData.price}}</p>
      </v-popup>

      <img class="v-catalog-item__image" v-bind:src=" 'https://www.ferti-organic.com/theme/img/' + productData.image" alt="img">
      <p class="v-catalog-itemName">{{productData.name}}</p>
      <p class="v-catalog-itemPrice">Price: {{productData.price}}</p>
      <button 
        @click="showPopupInfo"
        >Show info</button>
        
      <button 
        class="v-catalog-itemAddCart btn" 
        @click="addToCart"
        >Add to cart</button>
    </div>
</template>

<script>
import vPopup from './popup/v-popup.vue'

export default {
    name: "v-catalog-item",
    components: { vPopup },
    props: {
      productData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        isInfoPopup: false
      }
    },
    computed: {},
    methods: {
      closePopup() {
        this.isInfoPopup = false
      },
      showPopupInfo () {
        this.isInfoPopup = true
      },
      addToCart () {
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