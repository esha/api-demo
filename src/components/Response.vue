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
                Status: 200,
                Headers:
`date: Fri, 13 Oct 2017 22:20:53 GMT
via: 1.1 vegur
last-modified: Fri, 22 Sep 2017 06:24:19 GMT
server: Apache-Coyote/1.1
x-powered-by: Express`,
                Body: '{"text":"example"}'
            }
        };
    }
}
</script>

<style>
</style>
