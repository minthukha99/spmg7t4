<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Users in <u>{{ department }} </u> department</h1>
        <div>
            <table v-if="selectedRole == 'Manager'">
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Staff ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Courses Completed</th>
                        <th scope="col">Action 1</th>
                        <!-- <th scope="col" v-if="selectedRole=='HR'">Action 3</th> -->

                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(staff,key,index) in coursesCompletedArray" :key="staff">
                        <td>
                            {{ index+1 }}
                        </td>
                        <td>
                            {{ key }}
                        </td>
                        <td>
                            {{ staff.name }}
                            <!-- {{ user.staffFName }} {{ user.staffLName }} -->
                        </td>
                        <td>
                            <ul v-for="eachCourse in staff.course" :key="eachCourse">
                                <li> {{ eachCourse }} </li>
                            </ul>

                        </td>
                        <td>
                            <router-link :to="`/ViewUserLearningJourney/${key}`">View Learning Journey </router-link>
                        </td>
                        <!-- <td scope="row" data-label="Index">{{ index + 1 }}</td>
                                <td scope="row" data-label="Name">{{ role.roleName }}</td> -->
                        <!-- <td scope="row" data-label="Skills">{{ role.skillName }}</td> -->
                        <!-- show in bullet point if got data, else dash -->
                        <!-- <td v-if="role.skillName == ''">
                                    -
                                </td> -->
                        <!-- <td v-else>
                                    <ul scope="row" data-label="Skills" v-for="x in role.skillName" :key="x">
                                        <li> {{ x }}</li>
                                    </ul>
                                </td> -->
                        <!-- <td scope="row" data-label="Action 3"><a href="#"> Add to Learning Journey</a></td> -->
                        <!-- <td>
                                    <router-link :to="`/UpdateRole/${role.id}`">Edit</router-link>
                                </td> -->

                        <!-- <td v-if="role.status == false">
                                    <a class="mouseover" v-on:click="activateRoles(role.roleName)">Activate</a>
                                </td>
                                <td v-else-if="role.status == true">
                                    <a class="mouseover" v-on:click="deactivateRoles(role.roleName)">Deactivate</a>
                                </td>
    
                                <td v-if="role.status == false" class="inactive" data-label="Status">
                                    Inactive
                                </td>
                                <td v-else-if="role.status == true" class="active" data-label="Status">
                                    Active
                                </td> -->

                        <!-- <td scope="row" data-label="Action 4">
                    <router-link :to="`/AssignSkillstoRole/${role.roleName}`">Assign skills</router-link>
                    <router-link :to="{roleName:'user', params: {id:role.roleName} }">Assign skills</router-link>
                    <router-link to="/AssignSkillstoRole">Assign skills</router-link>
                  </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table v-if="selectedRole == 'Admin'">
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Action 1</th>
                        <!-- <th scope="col" >Action 2</th> -->
                        <!-- <th scope="col" v-if="selectedRole=='HR'">Action 3</th> -->

                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(user,index) in sortedList" :key="user" data-test="sortList">
                        <td>
                            {{ index+1 }}
                        </td>
                        <td>
                            {{ user.staffFName }} {{ user.staffLName }}
                        </td>
                        <td>
                            {{ user.department }} 
                        </td>
                        <td>
                            <!-- <router-link :to="`/AssignSkillstoRole/${role.roleName}`">Assign skills</router-link> -->
                            <router-link :to="`/ViewUserLearningJourney/${user.staffId}`">View Learning Journey</router-link>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>

        <div>

            <div class="buttons">
                <button class="special prevButton" @click="prevPage">Previous</button>
                <button class="special nextButton" @click="nextPage">Next</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Users',

    mounted() {
        // this.getRoles()

        this.getCurrentRole()
    },

    data() {
        return {
            usersList: [],
            pageSize: 10,
            currentPage: 1,
            selectedRole: "",
            coursesDoneByUser: [], // store information from API call
            coursesCompletedArray: {}, // store dictionary with key=staf id, value= list of courses completed by user
            // rolesList: [],
            // selectedRole: "",
            // activeRoles: []
            myList: [],
            department: "" // to show the department of users when user role is manager
        }
    },

    methods: {
        getCurrentRole() {
            this.selectedRole = sessionStorage.getItem('selectedRole') // get role saved in session storage   
            if (this.selectedRole == "Admin") {
                this.getAllUsers() // display all users if role is Admin
            } else if (this.selectedRole == "Manager") {
                this.getUsersUnderManager()

            }
        },

        getAllUsers() {
            const url = "http://localhost:3000/users"
            axios.get(url)
                .then(response => {

                    for (var eachUser of response.data) {
                        this.usersList.push({
                            staffId: eachUser.Staff_ID,
                            staffFName: eachUser.Staff_FName,
                            staffLName: eachUser.Staff_LName,
                            department: eachUser.Dept,
                            email: eachUser.Email,
                            role: eachUser.Role,
                        })
                    }
                    // console.log(this.usersList)

                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        getUsersUnderManager() {
            // for a given manager id, get the users under him by getting users with same department
            var userId = sessionStorage.getItem('userId')
            const url = "http://localhost:3000/coursecompletedbystaff/" + userId
            axios.get(url)
                .then(response => {
                    // console.log(response.data[0].dept)
                    this.department = response.data[0].dept
                    for (var eachCourseCompleted of response.data) {
                        this.coursesDoneByUser.push({
                            staffId: eachCourseCompleted.staff_ID,
                            courseId: eachCourseCompleted.course_ID,
                            completedStatus: eachCourseCompleted.Completion_Status,
                            name: eachCourseCompleted.staff_FName + " " + eachCourseCompleted.staff_LName,

                            //    "staff_FName": "Mary",
                            // "staff_LName": "Teo",
                        })
                    }
                    // console.log(this.coursesDoneByUser)
                    for (var eachCourseDone of this.coursesDoneByUser) {
                        var ifUserInArray = this.coursesCompletedArray[eachCourseDone.staffId] //check if staffId is in array
                        if (ifUserInArray != undefined && eachCourseDone.completedStatus == "Completed") {
                            // means the staffId is already in the array and staff completed the course, need to edit the info in the array
                            var listExtracted = this.coursesCompletedArray[eachCourseDone.staffId].course
                            listExtracted.push(eachCourseDone.courseId)
                            // console.log(listExtracted)
                            this.coursesCompletedArray[eachCourseDone.staffId] = {
                                name: eachCourseDone.name,
                                course: listExtracted
                            }
                        } else if (eachCourseDone.completedStatus == "Completed") {
                            // staffId not in array and staff completed the course , need to add the info
                            this.coursesCompletedArray[eachCourseDone.staffId] = {
                                name: eachCourseDone.name,
                                course: [eachCourseDone.courseId]
                            }
                        }
                    }
                    // console.log(this.coursesCompletedArray)

                    // for (var eachCourseDone of this.coursesDoneByUser) {
                    //     console.log(eachCourseDone)
                    //     this.myList.push({
                    //         name: eachCourseDone.name
                    //     })
                    //     console.log(this.myList)
                    // }
                    // console.log(this.myList,"HERE")  
                })
                .catch(error => {
                    console.log(error.message)
                })
        },

        nextPage: function () {
            if ((this.currentPage * this.pageSize) < this.usersList.length) this.currentPage++;
        },

        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        }
        //     getRoles() {
        //         this.selectedRole = sessionStorage.getItem('selectedRole') // get role saved in session storage
        //         const url = "http://localhost:3000/roles";
        //         axios.get(url)
        //             .then(response => {
        //                 var roleData = response.data
        //                 console.log("roleData=", roleData)
        //                 for (var role of roleData) {
        //                     this.rolesList.push({
        //                         id: role.roleID,
        //                         roleName: role.roleName,
        //                         skillName: role.skillName,
        //                         status: role.status
        //                     });
        //                     if (role.status == 1) {
        //                         this.activeRoles.push(
        //                             {
        //                                 roleName: role.roleName,
        //                                 skillName: role.skillName,
        //                             }
        //                         )
        //                     }
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log(error.message)
        //             })
        //     },

        //     deactivateRoles(roleName) {

        //         let url = "http://localhost:3000/deleterole/" + roleName;
        //         axios.put(url)
        //             .then(response => {
        //                 console.log("deactived role:", roleName)
        //                 // this.getRoles()
        //                 location.reload()

        //             })
        //             .catch(error => {
        //                 console.log(error.message)
        //             })

        //     },

        //     activateRoles(roleName) {
        //         let url = "http://localhost:3000/activaterole/" + roleName;
        //         axios.put(url)
        //             .then(response => {
        //                 // this.getRoles()
        //                 location.reload()
        //                 console.log("activated role:", roleName)

        //             })
        //             .catch(error => {
        //                 console.log(error.message)
        //             })

        //     }

    },

    computed: {
        sortedList: function () {
            return this.usersList.filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
a {
    color: blue;
    text-decoration: underline;
}

.special {
    color: white;
    text-decoration: none;
}

.buttons {
    float: right;
}

.grid {
    background: none;
}
</style>
