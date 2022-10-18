<template>
  <header class="header">
      <nav class="nav links text-white" v-if="fullView">
          <!--added in a class called topnav (removed)-->
          <template :key="route.path" v-for="(route) in routes">
              <router-link v-if="route.meta.visible" :to="route.path.toLowerCase()">
              {{ route.name }}
              </router-link>
          </template>
          <select>
            <option selected="true" disabled="disabled">Select your role</option>
            <option v-for="role in rolesList" :key="role">{{role}}</option>
          </select>
      </nav>

      <nav class="nav small" v-else>
      <div id="nav-icon3" :class="classNames" @click="showButton">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      </div>
  
      <div id="home-dropdown-small" :class="dropdownClass" @click="showButton">
          <!-- Router link to paths -->
          <template :key="route.path" v-for="(route) in routes">
              <router-link v-if="route.meta.visible" :to="route.path.toLowerCase()">
                  {{ route.name }}
              </router-link>
          </template>
      </div>
      </nav>
  </header>
  
</template>
  
<script>
  export default {
    name: "NavigationBar",
    data() {
      return {
        fullView: true,
        dropdownClass: "dropdown-content",
        dropdownShown: false,
        views: ["Learning Journey", "Skills", "Roles", "Courses"],
        classNames: { open: false, "ml-auto": true },
        rolesList: ['HR', 'Staff', 'Manager'],
        roleName: ""
      };
    },
    methods: {
      showButton() {
        if (this.dropdownShown) {
          this.dropdownShown = false;
          this.dropdownClass = "dropdown-content";
          this.classNames.open = false;
        } else {
          this.dropdownShown = true;
          this.dropdownClass = "dropdown-content show-content";
          this.classNames.open = true;
        }
      },
    },
    created() {
      if (window.innerWidth < 760) {
        this.fullView = false;
      }
      //   track the width on resize
      window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
          //   reset it if you expand the screen
          this.dropdownShown = false;
          this.dropdownClass = "dropdown-content";
          this.fullView = true;
          this.classNames.open = false;
        } else {
          this.fullView = false;
        }
      });
    },
    computed: {
      // Current route I guess. Can use to dynamically render navbar active links
      view() {
        return this.$route.name;
      },
  
      // return all routes from router
      routes() {
        return this.$router.options.routes;
      },
    },
  };
  </script>
  
<style scoped>

    .header {
        height:auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        max-height: 100vh;
        padding: 0.5rem;
        position: relative;
    }

    .header-middle-text {
        margin-top: 9rem;
        width: 70%;
        flex-direction: column;
        align-items: flex-start;
    }

    .nav {
        /* margin: 0; */
        display: flex;
        align-items: center;
        align-content: space-around;
        justify-content: center;
        /* flex-wrap: wrap;
        flex-direction: row; */
    }

    a {
        font-weight: bold;
        margin: 0 0.5rem;
        padding: 50px 30px 30px 30px;
    }
          
    .router-link-exact-active {
      color:grey;
    }

    .nav #home .homeimg {
      border-radius: 50%;
      height: 120px;
    }

    #nav-icon3 {
      width: 45px;
      height: 10px;
      position: relative;
      margin-left: auto;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      cursor: pointer;
      align-content: center;
    }

    .small {
      /* position:inherit;
      text-align: center; */
      padding: 20px 20px 30px;
      margin-left: auto;
      display: inline;
    }

    .small .dropdown-content {
      position: absolute;
      top: 60px;
      right: 0px;
      /* display: flex; */
      flex-direction: column;
      border-radius: 5px;
      background: #ebecee;
      box-shadow: rgb(206, 209, 209)6px 0 rgb(0 0 0 /  10%);
      z-index: 1;
      width: 200px;
    }

    .links {
        display: flex;
        width: 90%;
        justify-content: space-around;
        align-items: center;
        align-content: space-around;
      }

    .small .dropdown-content a {
      padding: 12px 16px;
      margin-left: 0;
      margin-right: 0;
      text-decoration: none;
      display: flex;
      text-align: left;
    }

    .small .dropdown-content {
      position: absolute;
      top: 60px;
      right: 0;
      display: none;
      flex-direction: column;
      z-index: 1;
      width: 200px;
    }

    .small .dropdown-content.show-content {
      display: flex;
    }

    #nav-icon3.open span:first-child {
      top: 15px;
      width: 0;
      left: 50%;
    }

    #nav-icon3 span {
      display: block;
      position: absolute;
      height: 5px;
      width: 100%;
      background: #2c3e50;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: .25s ease-in-out;
    }

    #nav-icon3.open span:nth-child(2) {
      transform: rotate(45deg);
    }

    #nav-icon3 span:nth-child(2), #nav-icon3 span:nth-child(3) {
        top: 10px;
    }

    #nav-icon3.open span:nth-child(3) {
      transform: rotate(-45deg);
    }

    #nav-icon3 span:nth-child(2), #nav-icon3 span:nth-child(3) {
        top: 10px;
    }

    #nav-icon3.open span:nth-child(4) {
      top: 18px;
      width: 0;
      left: 50%;
    }

    @media screen and (max-width: 230px) {
      #home-dropdown-small {
        width: 150px;
      }
    }

    select {
      padding: 10px;
      color: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.12);
      background: #f8f8f8;
      width: 20%;
      margin-top: 20px
    }

  </style>
  