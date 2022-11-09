<template>
<div class="home-page-wrapper">
    <!--top header-->
    <header class="header">
        <div class="header-middle-text d-flex">
            <h1><i>Learning Journey Management System</i></h1>
        </div>
        <section class="header-middle-text container">
            <div class="text-center">
                <h5 class="mb-1">Read the following instructions</h5>
                <p>
                    Enter your User ID:
                </p>
                <input type="text" @change="saveUserId" v-model="userId">
                <!-- <p>
                    Select your <b>role</b> before venturing to the other parts of the website
                </p> -->
                <p v-if="!errorMessage">
                    Role: <strong>{{ this.selectedRole }}</strong>
                </p>
                <p v-else class="errorMessage">
                    {{ errorMessage }}
                </p>
                <p>
                    150065 for Trainer
                    <br>
                    150008 for Manager
                    <br>
                    140002 for User
                    <br>
                    130002 for Admin
                </p>
            </div>

            <!-- <select v-model="selectedRole" @change="saveRoleInSession">
                <option selected="true" disabled="disabled">Select your role</option>
                <option v-for="role in rolesList" :key="role">{{role}}</option>
            </select> -->
        </section>
    </header>
</div>
</template>

<script>
// @ is an alias to /src
// Components
import axios from "axios";
export default {
    name: "Home",
    data() {
        return {
            selectedRole: "",
            rolesList: ['Admin', 'User', 'Manager', 'Trainer'],
            userId: "",
            errorMessage: ""
        };
    },
    mounted() {
        this.selectedRole = sessionStorage.getItem('selectedRole')
        this.userId = sessionStorage.getItem('userId')
    },
    methods: {
        saveRoleInSession() {
            sessionStorage.setItem('selectedRole', this.selectedRole)
            location.reload()
        },
        saveUserId() {

            sessionStorage.setItem('userId', this.userId)
            sessionStorage.setItem("selectedRole", "")
            this.errorMessage = ""
            const url = "http://localhost:3000/user/" + this.userId;
            axios.get(url)
                .then(response => {
                    console.log(response.data.Role)
                    if (response.data.Role == 1) {
                        this.selectedRole = "Admin"

                    } else if (response.data.Role == 2) {
                        this.selectedRole = "User"

                    } else if (response.data.Role == 3) {
                        this.selectedRole = "Manager"

                    } else {
                        this.selectedRole = "Trainer"
                    }
                    sessionStorage.setItem('selectedRole', this.selectedRole)
                    location.reload()

                })
                .catch(error => {
                    console.log("CAnnot be found")
                    this.errorMessage += "No such user!"

                })
        }
    },

    // components: {
    //   NavigationBar,
    // },
    // data() {
    //   return {
    //     fullView: true,
    //     dropdownClass: "dropdown-content",
    //     dropdownShown: false,
    //     views: ["Learning Journey", "Skills", "Roles", "Courses"],
    //     classNames: { open: false, "ml-auto": true },
    //   };
    // },
    // methods: {
    //   showButton() {
    //     if (this.dropdownShown) {
    //       this.dropdownShown = false;
    //       this.dropdownClass = "dropdown-content";
    //       this.classNames.open = false;
    //     } else {
    //       this.dropdownShown = true;
    //       this.dropdownClass = "dropdown-content show-content";
    //       this.classNames.open = true;
    //     }
    //   },
    // },
    // computed: {
    //   routes() {
    //     console.log(this.$router.options.routes);
    //     return this.$router.options.routes;
    //   },
    // },
    // created() {
    //   if (window.innerWidth < 760) {
    //     this.fullView = false;
    //   }
    //   //   track the width on resize
    //   window.addEventListener("resize", () => {
    //     if (window.innerWidth > 760) {
    //       //   reset it if you expand the screen
    //       this.dropdownShown = false;
    //       this.dropdownClass = "dropdown-content";
    //       this.fullView = true;
    //       this.classNames.open = false;
    //     } else {
    //       this.fullView = false;
    //     }
    //   });
    // }, 
};
</script>

<style scoped>
.errorMessage {
    color: red
}

.home-page-wrapper {
    overflow-x: hidden;
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

a {
    font-weight: bold;
}

.small {
    /* position:inherit; */
    /* text-align: center; */
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
    box-shadow: rgb(206, 209, 209)6px 0 rgb(0 0 0 / 10%);
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

.home-page-wrapper .small .dropdown-content a {
    padding: 12px 16px;
    margin-left: 0;
    margin-right: 0;
    text-decoration: none;
    display: flex;
    text-align: left;
}

.home-page-wrapper .small .dropdown-content {
    position: absolute;
    top: 60px;
    right: 0;
    display: none;
    flex-direction: column;
    /* box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%); */
    z-index: 1;
    width: 200px;
}

.home-page-wrapper .small .dropdown-content.show-content {
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

#nav-icon3 span:nth-child(2),
#nav-icon3 span:nth-child(3) {
    top: 10px;
}

#nav-icon3.open span:nth-child(3) {
    transform: rotate(-45deg);
}

#nav-icon3 span:nth-child(2),
#nav-icon3 span:nth-child(3) {
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

@media screen and (max-width: 1280px) {
    h1 {
        font-size: 40px;
    }
}
</style>
