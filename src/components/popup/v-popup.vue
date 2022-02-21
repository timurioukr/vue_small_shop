<template>
  <div class="popup_wrapper" ref="wrapper">
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
          @click="rightButtonAction">{{rightButtonTitle}}</button>
      </div>

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
    },
    rightButtonAction() {
      this.$emit('action')
    }
  },
  mounted() {
    let vm = this;
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['wrapper']) {
        vm.closePopup()
      }
    })
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
.popup_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(68, 54, 51, 0.726);
}
</style>