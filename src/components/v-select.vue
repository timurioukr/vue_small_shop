<template>
  <div class="vselect">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">{{selected}}</p>
    <div class="options" v-if="areOptionsVisible">
      <p v-for="option in options" :key="option.value" @click="selectOption(option)">{{ option.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "vselect",
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option)
      this.areOptionsVisible = false
    },
    hideSelect() {
      this.areOptionsVisible = false
    }
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true )
  },
  beforeDestroy(){
    document.removeEventListener("click", this.hideSelect)
  }
};
</script>

<style>
.vselect {
  position: relative;
  width: 200px;
  cursor: pointer;
}
.title {
  border: solid 1px #232323;
}
.vselect p {
  margin: 0;
}
.options {
  border: solid 1px #232323;
  position: absolute;
  top: 35px;
  right: 0;
  width: 100%;
}

.options p:hover {
        background: #b1b1b1;
    }
</style>