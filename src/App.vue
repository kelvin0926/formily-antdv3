<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Input from './formDesigner/components/input'
import FormDesigner from './formDesigner'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <FormDesigner />
  <!-- <Input placeholder="这是组件"></Input> -->
</template>

<style lang="less">
#app {}



.formily-antdv-form-item .formily-antdv-form-item-item-col-24 {
  flex: auto;
}
</style>
