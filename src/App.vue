<template>
  <div id="app">
    <div id="logo">
      <a href="http://esha.com"><img src="./assets/logo.png"></a>
    </div>
    <Demo msg="Genesis API Demo/Console"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Demo from './components/Demo.vue';

@Component({
  components: {
    Demo,
  },
})
export default class App extends Vue {}
</script>

<style>
#logo {
  position: fixed;
  left: 88vmax;
  top: 0;
  z-index: -1;
}
#logo img {
  width: 10vmax;
  min-width: 100px;
  max-height: 10vmax;
}
</style>
