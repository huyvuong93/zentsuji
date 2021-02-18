<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'nicola';
  src: url('fonts/nicoca_v1.ttf');
}
#app {
  max-width: 428px;
  margin: 0 auto;
  height: 100vh;
  font-family: 'nicola', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}
body{
  margin:0;
  background-color: #FDEEEF;
}
</style>
