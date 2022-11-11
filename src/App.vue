<template>
  <div class="app-wrapper">
    <!-- <router-view v-if="currentRoute === '/'" />
    <div v-else> -->
      <NavigationBar />
      <div class="app-content-wrapper">
        <router-view />
      </div>
    <!-- </div> -->
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

  html {
    background: #f0f4f7;
  }

  .header {
    margin-top: 20px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
  }

  .header-middle-text {
      width: 80%;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* padding: 40px; */
    color: #2c3e50;
  }

  img {
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
  }

  button {
    background-color: #1E232A;
    color: white;
    border-radius: 10px;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
  }

  input {
    padding: 20px;
    border: 1px solid #ccc;
    display: inline-block;
    background: none;
    /* width: 80%; */
  }

  select {
    padding: 20px;
    width: 100%;
    display: inline-block;
    border: 1px solid #ccc;
    background: none;
    /* margin-bottom: 10px; */
  }

  .selectBox{
      display:relative;
      background-color: white;
      border: 1px solid #ccc;
      padding: 10px;
      max-height: 200px;
      width: 100%;
      overflow: scroll;
  }
  
  table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
  }

  table tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
  }

  table th,
  table td {
    padding: .625em;
    text-align: center;
  }

  @media screen and (max-width: 780px) {
    table {
      border: 0;
    }
    
    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    
    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: .625em;
    }
    
    table td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: .8em;
      text-align: right;
    }
    
    table td::before {
      /*
      * aria-label has no advantage, it won't be read inside a table
      content: attr(aria-label);
      */
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    table td:last-child {
      border-bottom: 0;
    }
  }

  .inactive {
    color: rgba(184, 56, 56, 0.77);
  }

  .active {
    color: rgba(40, 190, 42, 0.77);
  }

  .errorMessage {
      color: red
  }
  .successMessage {
      color: green
  }
</style>
