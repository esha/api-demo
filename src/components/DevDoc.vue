<template>
  <div class="devdoc">
    <h1>{{ msg }}</h1>
    <section v-for="(list, title) in links" :key="title">
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="(url, name) in list" :key="name">
          <a :href="url">{{ name }}</a> - {{ url }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'devdoc',
  data () {
    return {
      msg: 'Demo App Documentation',
      links: {
        'Project': {
          'Source': 'https://github.com/esha/hnoss',
          'Issues': 'https://github.com/esha/hnoss/issues'
        },
        'Major Dependencies': {
          'vue.js': 'https://vuejs.org',
          'webpack': 'https://webpack.js.org/',
          'typescript': 'https://www.typescriptlang.org/',
          'vue-router': 'http://router.vuejs.org/',
          'vue-loader': 'https://vue-loader.vuejs.org/en/',
          'ts-loader': 'https://github.com/TypeStrong/ts-loader',
          'vue-cli webpack template': 'http://vuejs-templates.github.io/webpack/'
        },
        'Tutorials': {
          'Vue-cli webpack + TypeScript': 'https://alexjoverm.github.io/2017/06/28/Integrate-TypeScript-in-your-Vue-project/',
          'Vue 2 + TypeScript 2 Guide': 'https://herringtondarkholme.github.io/2016/10/03/vue2-ts2/'
        },
        'Support': {
          'Forum': 'https://forum.vuejs.org',
          'Gitter Chat': 'https://gitter.im/vuejs/vue'
        },
        'Major Dependencies Under Consideration': {
          'vuex': 'http://vuex.vuejs.org/',
          'vue-class-component': 'https://github.com/vuejs/vue-class-component'
        },
        'Resource Lists': {
          'awesome-vue': 'https://github.com/vuejs/awesome-vue'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.devdoc {
  text-align: left;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
