<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Courses</h1>
        <input type="text" v-model="searchValue" placeholder="Search Course" />
        <br><br>
        <label>Select a skill</label>
        <select v-model="selectedSkill">
            <option value="">All</option>
            <option v-for="skill in skillsList" :key="skill.skillID">{{skill.skillName}}</option>
        </select>
        <br><br>
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>

                        <th scope="col" v-if="selectedRole =='Admin'">Status</th>
                        <th scope="col" v-if="selectedRole =='Admin'">Action 1</th>
                        <th scope="col" v-if="selectedRole =='Admin'">Action 2</th>

                    </tr>
                </thead>
                <tbody v-if="this.selectedSkill!='' && this.searchValue == '' && selectedRole == 'Admin'">
                    <tr v-for="(course, index) in filteredSkillCourses" :key="course.courseName">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Code">{{ course.id }}</td>
                        <td scope="row" data-label="Name">{{ course.courseName }}</td>

                        <div v-if="errorMessage" class="errorMessage">
                            {{ errorMessage }}
                        </div>
                        <td scope="row" v-if="course.courseStatus == 'Retired'" data-label="Status" class="inactive">
                            {{ course.courseStatus }}
                        </td>

                        <td scope="row" v-else-if="course.courseStatus == 'Pending'" data-label="Status">
                            {{ course.courseStatus }}
                        </td>

                        <td scope="row" v-else data-label="Status" class="active">
                            {{ course.courseStatus }}
                        </td>

                        <td v-if="course.courseStatus == 'Active'" data-label="Action 2">
                            <a class="mouseover" v-on:click="deactivateCourses(course.id)">Deactivate</a>
                        </td>

                        <td v-else-if="course.courseStatus == 'Retired'" data-label="Action 2">
                            <a class="mouseover" v-on:click="activateCourses(course.id)">Activate</a>
                        </td>

                        <td v-else>
                            -
                        </td>

                        <td>
                            <a>
                                <router-link :to="`/AssignSkillstoCourse/${course.id}`">Assign Skills</router-link>
                            </a>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="this.searchValue!='' && this.selectedSkill=='' && selectedRole == 'Admin' ">
                    <tr v-for="(course, index) in filteredCourses" :key="course.courseName">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Code">{{ course.id }}</td>
                        <td scope="row" data-label="Name">{{ course.courseName }}</td>

                        <td scope="row" v-if="course.courseStatus == 'Retired'" data-label="Status" class="inactive">
                            {{ course.courseStatus }}
                        </td>

                        <td scope="row" v-else-if="course.courseStatus == 'Pending'" data-label="Status">
                            {{ course.courseStatus }}
                        </td>

                        <td scope="row" v-else data-label="Status" class="active">
                            {{ course.courseStatus }}
                        </td>

                        <td v-if="course.courseStatus == 'Active'" data-label="Action 2">
                            <a class="mouseover" v-on:click="deactivateCourses(course.id)">Deactivate</a>
                        </td>

                        <td v-else-if="course.courseStatus == 'Retired'" data-label="Action 2">
                            <a class="mouseover" v-on:click="activateCourses(course.id)">Activate</a>
                        </td>

                        <td v-else>
                            -
                        </td>

                        <td>
                            <a>
                                <router-link :to="`/AssignSkillstoCourse/${course.id}`">Assign Skills</router-link>
                            </a>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else-if="this.searchValue=='' && this.selectedSkill=='' && selectedRole == 'Admin'">
                    <tr v-for="(course, index) in coursesList" :key="course.courseName">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Code">{{ course.id }}</td>
                        <td scope="row" data-label="Name">{{ course.courseName }}</td>

                        <td scope="row" v-if="course.courseStatus == 'Retired'" data-label="Status" class="inactive">
                            {{ course.courseStatus }}
                        </td>

                        <td scope="row" v-else-if="course.courseStatus == 'Pending'" data-label="Status">
                            {{ course.courseStatus }}
                        </td>

                        <td scope="row" v-else data-label="Status" class="active">
                            {{ course.courseStatus }}
                        </td>

                        <td v-if="course.courseStatus == 'Active' && selectedRole != 'Learner'" data-label="Action 2">
                            <a class="mouseover" v-on:click="deactivateCourses(course.id)">Deactivate</a>
                        </td>

                        <td v-else-if="course.courseStatus == 'Retired' && selectedRole != 'Learner'" data-label="Action 2">
                            <a class="mouseover" v-on:click="activateCourses(course.id)">Activate</a>
                        </td>

                        <td v-else-if="selectedRole != 'Learner'">

                        </td>

                        <td v-if="selectedRole != 'Learner'">
                            <a>
                                <router-link :to="`/AssignSkillstoCourse/${course.id}`">Assign Skills</router-link>
                            </a>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else-if="this.selectedSkill!='' && this.searchValue == '' ">
                    <tr v-for="(course, index) in filteredActiveSkillCourses" :key="course.courseName">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Code">{{ course.id }}</td>
                        <td scope="row" data-label="Name">{{ course.courseName }}</td>
                    </tr>
                </tbody>

                <tbody v-else-if="this.selectedSkill=='' && this.searchValue != '' ">
                    <tr v-for="(course, index) in filteredActiveCourses" :key="course.courseName">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Code">{{ course.id }}</td>
                        <td scope="row" data-label="Name">{{ course.courseName }}</td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr v-for="(course, index) in activeCourses" :key="course.courseName">
                        <td scope="row" data-label="Index">{{ index +1}}</td>
                        <td scope="row" data-label="Code">{{ course.id }}</td>
                        <td scope="row" data-label="Name">{{ course.courseName }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Courses',
    mounted() {
        // this.getCourses()
    },

    data() {
        return {
            coursesList: [],
            searchValue: '',
            skillsList: [],
            selectedSkill: '',
            courseSkillList: [],
            errormessage: [],
            selectedRole: "",
            activeCourses: [],
            activeCoursesSkillList: []
        }
    },

    methods: {

        deactivateCourses(courseID) {

            let url = "http://localhost:3000/deactivecourse/" + courseID;
            axios.put(url)
                .then(response => {
                    console.log("deactived course:", courseID)
                    // this.getRoles()
                    location.reload()

                })
                .catch(error => {
                    console.log(error.message)
                })

        },

        activateCourses(courseID) {

            let url = "http://localhost:3000/activatecourse/" + courseID;
            axios.put(url)
                .then(response => {
                    location.reload()
                    console.log("activated course:", courseID)

                })
                .catch(error => {
                    console.log(error.message)
                })

        },
    },

    computed: {
        filteredCourses() {
            if (this.searchValue != " ") {
                return this.coursesList.filter(course =>
                    course.courseName.toLowerCase().includes(this.searchValue.toLowerCase())
                );
            }
        },

        filteredActiveCourses() {
            if (this.searchValue != " ") {
                return this.activeCourses.filter(course =>
                    course.courseName.toLowerCase().includes(this.searchValue.toLowerCase())
                );
            }
        },
    },

    created() {
        this.selectedRole = sessionStorage.getItem('selectedRole') // get role saved in session storage
        const url = "http://localhost:3000/courses";
        axios.get(url)
            .then(response => {
                var coursesData = response.data
                this.errorMessage = "";
                if (this.coursesData == 0) {
                    console.log("its empty")
                    this.errorMessage += "No courses available currently!"
                } else {
                    for (var course of coursesData) {
                        // console.log(course)

                        this.coursesList.push({
                            id: course.course_ID,
                            courseCat: course.course_Category,
                            courseDesc: course.course_Desc,
                            courseName: course.course_Name,
                            courseStatus: course.course_Status,
                            courseType: course.course_Type
                        });

                        if (course.course_Status == "Active") {
                            this.activeCourses.push({
                                id: course.course_ID,
                                courseCat: course.course_Category,
                                courseDesc: course.course_Desc,
                                courseName: course.course_Name,
                                courseStatus: course.course_Status,
                                courseType: course.course_Type
                            });
                        }

                    }
                    console.log(this.activeCourses)
                }
            })
            .catch(error => {
                console.log(error.message)
            })

        const url1 = "http://localhost:3000/availableskills";
        axios.get(url1)
            .then(response => {
                var skillData = response.data
                for (var skill of skillData) {
                    this.skillsList.push({
                        roles: skill.roleName,
                        skillDetail: skill.skillDetail,
                        skillID: skill.skillID,
                        skillName: skill.skillName,
                        status: skill.status
                    });
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
a {
    color: blue;
    text-decoration: underline;
}

.mouseover {
    cursor: pointer;
}
</style>
