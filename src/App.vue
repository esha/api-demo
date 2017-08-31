<template>
  <div id="app">
    <nav>
      <h2><router-link to="/">Genesis API Demo</router-link></h2>
      <ul>
        <li><router-link to="/slugway">Slugway (Interactive Data Demo)</router-link></li>
        <li><router-link to="/mabisco">Mabisco (Fixed Data Demo)</router-link></li>
        <li><router-link to="/api">API Docs</router-link></li>
        <li><router-link to="/dev">Demo Docs</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
nav ul {
  list-style-type: none;
}
nav a {
  text-decoration: none;
}
</style>
