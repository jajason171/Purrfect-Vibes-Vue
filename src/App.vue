<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
html {
  height: -webkit-fill-available; /* We have to fix html height */
}

body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  font-family: "Times New Roman", Times, serif;
}
nav {
  padding: 30px;
  background-color: #339268;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #339268;
    }
  }
  height: 10vh;
  max-height: 150px;
  /* @media (max-width: 768px) {
    height: 10%;
  } */
}
</style>
