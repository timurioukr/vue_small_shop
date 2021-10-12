<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart', params: { cartData: CART }}">
      <div class="v-catalog__link_to_cart">Cart: {{CART.length}}</div>
    </router-link>
    <h1>Catalog</h1>
    <div class="filters">
      <v-select 
      :selected="selected"
      :options="categories"
      @select="sortByCategories"
      :isExpanded = "IS_DESKTOP"
    />
    <div class="range-slider">
      <input
        v-model.number="minPrice"
        type="range" 
        min="0" 
        max="300"
        step="10"
        @change="setRangeSlider"

        >
      <input
        v-model.number="maxPrice"
        type="range" 
        min="0" 
        max="300" 
        step="10"
        @change="setRangeSlider"
        >
    </div>
    <div class="range-values">
      <p>Min: {{minPrice}}</p>
      <p>Max: {{maxPrice}}</p>
    </div>
    </div>
		<div class="v-catalog__list">
			<v-catalog-item 
				v-for="product in filteredProducts"
				:key="product.article"
				v-bind:productData="product"
				@addToCart="addToCart"
			/>
		</div>
  </div>
</template>

<script>
import vCatalogItem from "./v-catalog-item.vue";
import { mapActions, mapGetters } from 'vuex'
import vSelect from "../components/v-select.vue"

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect
  },
  props: {},
  data() {
    return {
      categories: [
        {name: "All", value: "all"},
        {name: "Categori 1", value: "m"},
        {name: "Categori 2", value: "k"}
      ],
      selected: "All",
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 300
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART',
      'IS_MOBILE',
      'IS_DESKTOP'
    ]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
	methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.sortByCategories()
    },
    sortByCategories(category) {
      let vm = this
      this.sortedProducts = [...this.PRODUCTS]
      this.sortedProducts = this.sortedProducts.filter(function (item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice
      })
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(function (e) {
          vm.selected === category.name
          return e.category === category.name
        })
      }
    },
		addToCart(data) {
		this.ADD_TO_CART(data)
		}
	},
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {
      if (response.data) {
        console.log('Data arrived!')
        this.sortByCategories()
      }
    })
  }
}
</script>

<style lang="scss">
  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    &__link_to_cart {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: $padding*2;
      border: solid 1px;

    }
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }

  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
	
	

</style>
