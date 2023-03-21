<template>
  <NavBar />
  <router-view :key="$route.fullPath"/>
</template>

<script>
import NavBar from "@/components/NavBar"
export default {
  components: { NavBar }
}
</script>

<style>
#app {
  font-family: "Montseratt", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; 
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
