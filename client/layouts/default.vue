<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Добавить событие</router-link> |
      <router-link to="/search-event">Найти событие</router-link>
    </div>
    <nuxt/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    left: 0;
    right: 0;
    margin: auto;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.nuxt-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
