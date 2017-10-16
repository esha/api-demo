<template>
  <div class="layout-padding">
    <section v-for="(text, label) in request" :key="label" :class="label.toLowerCase()">
      <label :for="label">{{ label }}</label>
      <pre :name="label">{{ text }}</pre>
    </section>
  </div>
</template>

<script>
export default {
    data() {
        return {
            request: {
                URL: 'http://example.com',
                Method: 'GET',
                Headers:
`X-Requested-With: XMLHttpRequest
 Accept: application/json
 Content-Type: application/json`,
                Body: ''
            }
        };
    }
}
</script>

<style>
</style>
