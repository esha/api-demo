<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <Genesis-Service>
      <router-view />
    </Genesis-Service>
  </div>
</template>

<script>
import GenesisService from '@/GenesisService.vue';

/*
 * Root component
 */
export default {
    components: {
        GenesisService
    }
}
</script>

<style></style>
