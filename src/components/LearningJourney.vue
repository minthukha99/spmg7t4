<template>
<div class="learningJourney">
    <div class="header">
        <div class="header-middle-text">
            <!-- this part is for users to add new learning journeys in addition to their existing one, -->
            <!-- submit button doesnt work yet lol -->
            <h1><i>Add a Learning Journey</i></h1>
            <p>
                Select a role that you desire and add it to your current list of learning journeys to track your progress.
            </p>

            <input type="text" v-model="roleSelected" list="rolesList" @change="getSkillsForChosenRole">
            <datalist id="rolesList">
                <option v-for="role in rolesList" :key="role.id">{{role.roleName}}</option>
            </datalist>
            <br>
            <br>

            <div>
                <div v-if="roleSelected != '' && errorMessage.length == 0">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Skill required</th>
                                <th scope="col">Courses </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr scope="row" v-for="skill in skillsNeededForRole" :key="skill">
                                <td scope="col">
                                    {{skill.skillName}}
                                </td>
                                <td >
                                    <!-- <select v-model="skill.selected">
                                        <option disabled> Select an option </option>
                                        <option v-for="(eachCourse) in skill.course" :key="eachCourse" :value="eachCourse.course_ID">
                                            {{ eachCourse.course_Name }}
                                        </option>
                                    </select> -->
                                    {{ skill.learnt }}
                                    <div v-for="(eachCourse) in skill.course"  :key="eachCourse" >
                                        {{ skill.selected }}
                                        <input type="checkbox" :value="eachCourse.course_ID"  v-model="skill.selected">
                                        <label>{{ eachCourse.course_Name }}</label>
                                    </div>

                                </td>
                                <!-- <td v-if="skill.learnt == false">
                                    <select v-model="skill.selected">
                                        <option disabled> Select an option </option>
                                        <option v-for="(eachCourse) in skill.course" :key="eachCourse" :value="eachCourse.course_ID">
                                            {{ eachCourse.course_Name }}
                                        </option>
                                    </select> 
                                
                                </td> -->

                                <!-- <td v-else>
                                    <div class="errorMessage">
                                        You have already learned the Skill. Do choose the Course you have taken to learn this Skill
                                    </div>
                                    <select v-model="skill.selected">
                                        <option disabled> Select an option </option>
                                        <option v-for="(eachCourse) in skill.course" :key="eachCourse" :value="eachCourse.course_ID">
                                            {{ eachCourse.course_Name }}
                                        </option>
                                    </select>
                                </td> -->

                            </tr>
                        </tbody>

                    </table>

                    <div v-for="error in errorMessage2" :key="error" class="errorMessage">
                        <p>{{ error }} </p>
                    </div>

                    <button class="button special" @click="addCoursetoLJ">
                        Add to Learning Journey
                    </button>
                </div>

                <div v-else>
                    <ul v-for="error in errorMessage" :key="error" class="errorMessage">
                        <li>{{ error }} </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="header-middle-text">
            <h1><i>List of Learning Journeys Added</i></h1>
            <p>Learning journeys consist of courses that help you cover the most ground in the shortest amount of time for the position that you desire. Consider them your personal game plan for to upskill yourself.
            </p>
            <!-- <button @click='createRole(); $router.push("/Roles")' type="submit" value="Save" class="special"> -->
            <div class="card" v-for="(eachLJ,index) in roleList2" :key="eachLJ">
                <!-- <div class="card__image card__image--fence"></div> -->
                <div class="card__content">
                    <div class="card__title">
                        {{ eachLJ.roleName }}
                    </div>
                    <div class="card__text">
                        <div class="meter">
                            <span :style="{ width: coursesCounts[index].coursesCompletedPercentage + '%' }"></span>
                        </div>
                        Number of Courses completed: {{ coursesCounts[index].coursesDone }}
                        <br>
                        Total number of Courses: {{ coursesCounts[index].courseCount }}
                    </div>
                    <button class="special">
                        <router-link :to="`/LJComponent/${ LJlist[index].ljId }`">View Learning Journey</router-link>
                    </button>
                    <button class="special" @click="deleteLJ(LJlist[index].ljId)">
                        Delete Learning Journey
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Learning Journey',
    mounted() {
        this.getLJofUser(),
            this.getRegistration()
    },

    data() {
        return {
            rolesList: [], // a list to store all the possible roles in the company, for the user to choose to work on LJ
            roleSelected: "", // store value of role user selected
            roleSelectedId: "", // from user input role name, get and store the id of the role to call role details by id
            skillsNeededForRole: [], // to retrieve and display skills needed for user chosen role
            courseSelected: null, // a list containing all the courses user selected
            LJlist: [], // to store all the user LJ to display them
            roleList: [],
            roleList2: [],
            coursesCounts: [], // store the number of courses of each LJ 
            userRolesList: [], // store all users lj roles
            errorMessage: [], // to show error message if user select a duplicate role for LJ
            errorMessage2: [], // to show error message if user selct no course for a skill
            skillsList: [], // store skill id of all skills the user has earned
            coursesSelected: []
        }
    },
    created() {
        const url = "http://localhost:3000/availableroles";
        axios.get(url)
            .then(response => {
                var roleData = response.data
                for (var role of roleData) {
                    this.rolesList.push({
                        id: role.roleID,
                        roleName: role.roleName,
                        skillName: role.skillName,
                    });
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    },

    methods: {
        getRegistration() {
            // get the registration data in json from csv, to check if user acquired the course
            var userId = sessionStorage.getItem("userId")
            const url = "http://localhost:3000/skillLearntByUser/" + userId;
            // http://localhost:3000/registration/130001
            axios.get(url)
                .then(response => {
                    for (var eachSkill of response.data) {
                        this.skillsList.push(eachSkill.skillID)
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
        getSkillsForChosenRole() {
            console.log(this.coursesSelected)
            // get the skills required for a role
            // this.userRolesList.push(
            // get role id of user input roleName
            console.log(this.skillsList)
            this.errorMessage = []
            if (this.userRolesList.includes(this.roleSelected)) {
                this.errorMessage.push("Learning Journey with Role already added!")
            } else {
                for (var eachRole of this.rolesList) {
                    if (eachRole.roleName == this.roleSelected) {
                        this.roleSelectedId = eachRole.id
                    }
                }

                const url = "http://localhost:3000/role/" + this.roleSelectedId;
                axios.get(url)
                    .then(response => {
                        var skillarray = response.data.skillData
                        this.skillsNeededForRole = []
                        for (var skill of skillarray) {
                            // if skill is already learnt
                            var learntOrNot = this.skillsList.includes(skill.skillID)

                            this.skillsNeededForRole.push({
                                skillDetail: skill.skillDetail,
                                skillId: skill.skillID,
                                skillName: skill.skillName,
                                course: [],
                                selected: [],
                                learnt: learntOrNot
                            });
                        }
                        this.skillsNeededForRole.forEach(skill => {
                            var thisSkillName = skill.skillName
                            const url = "http://localhost:3000/coursebyskill/" + thisSkillName;
                            axios.get(url)
                                .then(response => {
                                    var activeCourse = []
                                    for (var eachCourse of response.data) {
                                        if (eachCourse.course_Status == "Active") {
                                            activeCourse.push(eachCourse)
                                        }
                                    }
                                    skill.course = activeCourse

                                })
                                .catch(error => {
                                    console.log(error.message)
                                })
                        })
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            }
        },
        getLJofUser() {
            // retrieve all the LJ of the user
            var userId = sessionStorage.getItem("userId")
            const url = "http://localhost:3000/getlearningjourneyby/" + userId;
            axios.get(url)
                .then(response => {
                    for (var eachLJ of response.data) {
                        this.LJlist.push({
                            ljId: eachLJ.LJID,
                            roleId: eachLJ.roleID,
                            roleName: [],
                            staffId: eachLJ.staff_ID,
                            courseCount: 0
                        })
                        this.roleList.push({
                            roleId: eachLJ.roleID
                        })
                    }
                    const array2 = this.LJlist
                    let promises2 = []
                    for (var i = 0; i < array2.length; i++) {
                        promises2.push(
                            axios
                            .get('http://localhost:3000/learningjourneyinfo/' + array2[i].ljId)
                            .then(response => {
                                this.userRolesList.push(response.data.LJInfo[0].roleName)

                                // data.LJInfo[0].roleName
                                // to get all the skills required for the role, so that page only show the courses for those skills. 
                                // without this, skills not required for this role will also go into the count
                                var skillsRequired = []
                                for (var eachSkill of response.data.skillNeededForRole) {
                                    skillsRequired.push(eachSkill.skillName)
                                }
                                //to get total number of courses to be completed and courses completed by user
                                var coursesToTake = 0 //store total courses to be completed
                                var coursesCompleted = 0 //store total courses completed
                                for (var eachCourse of response.data.courseRegistered) {
                                    if (skillsRequired.includes(eachCourse.skillName)) { //if skill learned in course is also skill required for role
                                        coursesToTake += 1
                                    }
                                    if (eachCourse.Completion_Status == "Completed" && skillsRequired.includes(eachCourse.skillName)) {
                                        coursesCompleted += 1
                                    }
                                }

                                //to get number of courses completed by user
                                // var coursesCompleted = 0 
                                // for (var eachCourse of response.data.courseRegistered) {

                                //   if (eachCourse.Completion_Status == "" && skillsRequired.includes(eachCourse.skillName)) {
                                //     coursesCompleted += 1
                                //     console.log(coursesCompleted)
                                //   }
                                // }
                                var percentageCourseCompleted = 0
                                if (coursesToTake > 0) {
                                    percentageCourseCompleted = Math.round((coursesCompleted / coursesToTake) * 100)
                                }
                                this.coursesCounts.push({
                                    courseCount: coursesToTake,
                                    coursesCompletedPercentage: percentageCourseCompleted,
                                    coursesDone: coursesCompleted
                                })
                            })
                            .catch(error => {
                                console.log(error.message)
                            })
                        )
                    }

                    const array = this.roleList
                    let promises = []
                    for (var i = 0; i < array.length; i++) {
                        promises.push(
                            axios
                            .get('http://localhost:3000/role/' + array[i].roleId)
                            .then(response => {
                                this.roleList2.push({
                                    roleName: response.data.roleName,
                                    roleId: response.data.roleID,
                                });
                            })
                            .catch(error => {
                                console.log(error.message)
                            })
                        )
                    }
                    Promise.all(promises).then(() => console.log())
                    Promise.all(promises2).then(() => console.log())
                })
                .catch(error => {
                    console.log(error.message)
                })

        },
        addCoursetoLJ() {
            console.log(this.skillsNeededForRole)
            // var courseChosenList = []
            // this.errorMessage2 = []
            // for (var eachSkillChosen of this.skillsNeededForRole) {
            //     courseChosenList.push(eachSkillChosen.selected)
            // }
            // //validation check to ensure user select a course for each skill
            // if (courseChosenList == "") {
            //     this.errorMessage2.push("You must choose a Course for each Skill")
            // } else {
            //     let url = "http://localhost:3000/learningjourney";
            //     // from skillsneedforrole array, get the courses chosen by user and add to a list

            //     axios.post(url, {
            //             roleName: this.roleSelected,
            //             staff_ID: sessionStorage.getItem("userId"),
            //             course_ID: courseChosenList
            //         })
            //         .then(response => {
            //             location.reload()
            //         })
            //         .catch(error => {
            //             console.log(error.message)
            //         })
            // }
        },
        deleteLJ(id) {
            axios
                .delete('http://localhost:3000/learningjourney/' + id)
                .then(response => {
                    location.reload()
                })
                .catch(error => {
                    console.log(error.message)
                })
        },
    },
}
</script>

<style scoped>
a {
    color: white;
}

.meter {
    margin-top: 10px;
    margin-bottom: 10px;
    box-sizing: content-box;
    height: 20px;
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

.card {
    margin-top: 10px;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.card__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
}

.card__title {
    color: #2c3e50;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 2px;
}

.card__text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
}

.special {
    color: white;
    text-decoration: none;
}

.errorMessage {
    color: red
}
</style>
