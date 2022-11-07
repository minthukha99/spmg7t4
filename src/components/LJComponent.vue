<template>
<div class="header">
    <div class="header-middle-text">
        <h1>Role: <u>{{ roleName }}</u></h1>
        <h4>Total Courses Required: {{ totalCourses}}</h4>
        <h4>Total Courses Completed: {{ coursesCompleted}} </h4>
        
        <div class="meter">
            <span :style="{ width: coursesCompletedPercentage + '%' }"></span>
        </div>
        <br>
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Skill Name</th>
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Registration Status</th>
                        <th scope="col">Completion Status</th>
                        <th scope="col">Action 1</th>
                        <th scope="col">Action 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ljData in ljInfolist" :key="ljData.regID">
                        <td scope="row" data-label="Skill Name">{{ ljData.skillName }}</td>
                        <td scope="row" data-label="Course Code">{{ ljData.courseCode }}</td>
                        <td scope="row" data-label="Course Name">{{ ljData.courseName }}</td>
                        <td scope="row" data-label="Registration Status">{{ ljData.regStatus }}</td>
                        <td scope="row" data-label="Completion Status">{{ ljData.completeStatus }}</td>
                        <td v-if="ljData.regStatus == 'Waitlist'" data-label="Action 1">
                            <a class="mouseover" v-on:click="registerCourse(ljData.regID)">Register</a>
                        </td>
                        <td v-else>
                            <span>-</span>
                        </td>
                        <td scope="row" >
                            <a class="mouseover" v-on:click="editLJCourse(ljData.regID)">Change Course</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    name: 'Learning Journey Profile',
    mounted() {
        this.getLearningJourneyInfo()
    },

    data() {
        return {
            // skillCourseList: [],
            ljInfolist: [],
            roleName: '',
            totalCourses: 0, // store total courses needed to clear for the role
            coursesCompleted: 0,// store courses completed 
            coursesCompletedPercentage: 0 //store percentage from above 2 data
        }
    },

    methods: {
        getLearningJourneyInfo() {
            const url = "http://localhost:3000/learningjourneyinfo/" + this.id;
            axios.get(url)
                .then(response => {
                    // to get all the skills required for the role, so that page only show the courses for those skills
                    // without this, skills not required for this role will also show
                    var skillsRequired = []
                    for (var eachSkill of response.data.skillNeededForRole) {
                        skillsRequired.push(eachSkill.skillName)
                    }

                    var ljInfoData = response.data
                    this.roleName = ljInfoData.LJInfo[0].roleName
                    for (var ljData of ljInfoData.courseRegistered) {
                        
                        if (skillsRequired.includes(ljData.skillName)) {
                            // show "-" if course completion is ""(course not completed, so registered/rejected/ waitlist)
                            var comptStatus = "-"
                            this.totalCourses += 1 
                            if (ljData.Completion_Status == "Completed") {
                                comptStatus = "Completed"
                                this.coursesCompleted +=1 //if course completed, increase count 
                            }
                            this.ljInfolist.push({
                                skillName: ljData.skillName,
                                courseCode: ljData.course_ID,
                                courseName: ljData.course_Name,
                                regID: ljData.Reg_ID,
                                regStatus: ljData.Reg_Status,
                                completeStatus: comptStatus,
                            });   
                        }
                    }
                    console.log(this.totalCourses)
                    console.log(this.coursesCompleted)
                    this.coursesCompletedPercentage = this.coursesCompleted/this.totalCourses

                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        registerCourse(regID) {
            let url = "http://localhost:3000/registerecourse/" + regID;
            axios.put(url)
                .then(response => {
                    console.log(url)
                    console.log("course registered under registration ID:", regID)
                    location.reload()

                })
                .catch(error => {
                    console.log(error.message)
                })

        },
        editLJCourse(id) {
            console.log(id)
            
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.meter {
    box-sizing: content-box;
    height: 20px;
    /* Can be anything */
    position: relative;
    background: #555;
    border-radius: 25px;
    padding: 2px;
}

.meter>span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: rgb(43, 194, 83);
    position: relative;
    overflow: hidden;
}

.meter>span:after,
.animate>span>span {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(-45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent);
    z-index: 1;
    background-size: 50px 50px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
}

.animate>span:after {
    display: none;
}

@keyframes move {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 50px 50px;
    }
}

a {
    color: blue;
    text-decoration: underline;
}

.mouseover {
    cursor: pointer;
}
</style>
