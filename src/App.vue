<template>
  <div class="app-wrapper">
    <router-view v-if="currentRoute === '/'" />
    <div v-else>
      <NavigationBar />
      <div class="app-content-wrapper">
        <router-view />
      </div>
    </div>
    <BottomBar />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import BottomBar from './components/BottomBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
    BottomBar,
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

.app-wrapper {
  overflow-x: hidden;
}

.app-content-wrapper {
  min-height: 100vh;
  padding: 0.5rem;
}

@media screen and (min-width: 468px) {
  .app-content-wrapper {
    padding: 0.5rem;
  }
}

@media screen and (min-width: 768px) {
  .app-content-wrapper {
    padding: 1rem;
  }
}
</style>
