<template>
  <div class="v-popup">
    <div class="v-popup_header">
      <span>{{popupName}}</span>
      <span><i @click="closePopup">X</i></span>
    </div>
    <div class="v-popup_content">
      <slot></slot>
    </div>
    <div class="v-popup_footer">
      <button @click="closePopup">Close</button>
      <button 
      class="v-catalog-itemAddCart btn" 
      @click="addToCart">{{rightButtonTitle}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-popup',
  props: {
    rightButtonTitle: {
      type: String,
      default: 'Ok'
    },
    popupName: {
      type: String,
      default: 'Popup window'
    }
  },
  data() {
    return {
      
    }
  },
  
  computed:{},
  methods: {
    closePopup() {
      this.$emit('closePopup')
    }
  },
}
</script>

<style scoped>
.v-popup {
  z-index: 10;
  padding: 16px;
  position: fixed;
  top: 50px;
  width: 400px;
  background: #fff;
}
.v-popup_header, .v-popup_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-popup_content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>