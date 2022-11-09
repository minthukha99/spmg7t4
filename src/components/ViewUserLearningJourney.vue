<template>
<div class="learningJourney">
    <div class="header">
        <div class="header-middle-text">
            <!-- <h1><i>Learning Journeys Added for {{ staffInfo.firstName }} {{ staffInfo.lastName }}</i></h1> -->
            <br>
            <!-- <h1><i>Learning Journeys Added for {{ staffInfo[0].firstName }}</i></h1> -->
            <h1><i>Learning Journeys Added for <u>{{ staffInfo[0]}} {{ staffInfo[1]}}</u></i></h1>
            <p>
                <strong>Email: </strong>{{staffInfo[2] }}
            </p>
            <!-- <button @click='createRole(); $router.push("/Roles")' type="submit" value="Save" class="special"> -->
            <div class="card" v-for="(eachLJ, index) in roleList2" :key="eachLJ">
                <!-- <div class="card__image card__image--fence"></div> -->
                <div class="card__content">
                    <div class="card__title">
                        {{ eachLJ.roleName }}
                    </div>
                    <div class="card__text">
                        <div class="meter">
                            <span :style="{ width: coursesCounts[index].percentageCourseCompleted + '%' }"></span>
                        </div>
                        Number of courses: {{ coursesCounts[index].courseCount }}

                    </div>
                    <!-- :to="`/AssignSkillstoCourse/${course.id}`" -->
                    <!-- LJlist -->
                    <!-- <button class="special"><router-link to="/LJComponent">View Learning Journey</router-link> -->
                    <button class="special">
                        <router-link :to="`/LJComponent/${LJlist[index].ljId}`">View Learning Journey
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
        <!-- don't delete the codes first in case y'all cannot figure out how to work with the above code -->
        <!-- <div class="section">
          <div class="pie" data-value="80"></div>
          <h4>Leadership Communication Skills for Influence and Impact</h4>
          <p>Develop the communication skills that will make you irreplaceable, influential and unstoppable as a 21st century leader</p>
          <span>
            <button type="button">
              Continue Learning
            </button>
          </span>
        </div> -->
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Learning Journey',
    mounted() {
        this.getLJofUser()
        this.getUserInfo()
    },
    props: ['id'],

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
            selectedCourses: [],
            staffInfo: [] // store user information
        }
    },

    methods: {
        getUserInfo() {
            const url = "http://localhost:3000/user/" + this.id
            axios.get(url)
                .then(response => {
                    this.staffInfo.push(response.data.Staff_FName, response.data.Staff_LName, response.data.Email)
                })

        },
        getLJofUser() {
            // retrieve all the LJ of the user
            var userId = sessionStorage.getItem("userId")
            const url = "http://localhost:3000/getlearningjourneyby/" + this.id;
            axios.get(url)
                .then(response => {
                    console.log(response)
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
                                // console.log(response.data.courseRegistered)
                                //to get number of courses completed by user
                                var coursesCompleted = 0
                                for (var eachCourse of response.data.courseRegistered) {
                                    if (eachCourse.Completion_Status) {
                                        coursesCompleted += 1
                                    }
                                }
                                var percentageCourseCompleted = 0
                                if (response.data.courseRegistered.length != 0) {
                                    percentageCourseCompleted = Math.round((coursesCompleted / response.data.courseRegistered.length) * 100)
                                }
                                this.coursesCounts.push({
                                    courseCount: response.data.courseRegistered.length,
                                    percentageCourseCompleted: percentageCourseCompleted
                                })
                                // console.log(this.coursesCounts)
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
                })
                .catch(error => {
                    console.log(error.message)
                })

        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
a {
    color: white;
}

/* .pie {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgb(203, 201, 201);
    background-image: linear-gradient(to right, transparent 50%, #4CC9D8 0);
    position: relative;
    display: inline-block;
    margin: 10px;
  }

  .pie::before {
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
  }

  .pie::after {
    content: attr(data-value);
    position: absolute;
    width: 70%;
    height: 70%;
    margin: auto;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    font: 900 20px/41px Tahoma;
  }

  .pie[data-value="0"]:before {
    transform: rotate(0turn);
  }

  .pie[data-value="1"]:before {
    transform: rotate(0.01turn);
  }

  .pie[data-value="2"]:before {
    transform: rotate(0.02turn);
  }

  .pie[data-value="3"]:before {
    transform: rotate(0.03turn);
  }

  .pie[data-value="4"]:before {
    transform: rotate(0.04turn);
  }

  .pie[data-value="5"]:before {
    transform: rotate(0.05turn);
  }

  .pie[data-value="6"]:before {
    transform: rotate(0.06turn);
  }

  .pie[data-value="7"]:before {
    transform: rotate(0.07turn);
  }

  .pie[data-value="8"]:before {
    transform: rotate(0.08turn);
  }

  .pie[data-value="9"]:before {
    transform: rotate(0.09turn);
  }

  .pie[data-value="10"]:before {
    transform: rotate(0.1turn);
  }

  .pie[data-value="11"]:before {
    transform: rotate(0.11turn);
  }

  .pie[data-value="12"]:before {
    transform: rotate(0.12turn);
  }

  .pie[data-value="13"]:before {
    transform: rotate(0.13turn);
  }

  .pie[data-value="14"]:before {
    transform: rotate(0.14turn);
  }

  .pie[data-value="15"]:before {
    transform: rotate(0.15turn);
  }

  .pie[data-value="16"]:before {
    transform: rotate(0.16turn);
  }

  .pie[data-value="17"]:before {
    transform: rotate(0.17turn);
  }

  .pie[data-value="18"]:before {
    transform: rotate(0.18turn);
  }

  .pie[data-value="19"]:before {
    transform: rotate(0.19turn);
  }

  .pie[data-value="20"]:before {
    transform: rotate(0.2turn);
  }

  .pie[data-value="21"]:before {
    transform: rotate(0.21turn);
  }

  .pie[data-value="22"]:before {
    transform: rotate(0.22turn);
  }

  .pie[data-value="23"]:before {
    transform: rotate(0.23turn);
  }

  .pie[data-value="24"]:before {
    transform: rotate(0.24turn);
  }

  .pie[data-value="25"]:before {
    transform: rotate(0.25turn);
  }

  .pie[data-value="26"]:before {
    transform: rotate(0.26turn);
  }

  .pie[data-value="27"]:before {
    transform: rotate(0.27turn);
  }

  .pie[data-value="28"]:before {
    transform: rotate(0.28turn);
  }

  .pie[data-value="29"]:before {
    transform: rotate(0.29turn);
  }

  .pie[data-value="30"]:before {
    transform: rotate(0.3turn);
  }

  .pie[data-value="31"]:before {
    transform: rotate(0.31turn);
  }

  .pie[data-value="32"]:before {
    transform: rotate(0.32turn);
  }

  .pie[data-value="33"]:before {
    transform: rotate(0.33turn);
  }

  .pie[data-value="34"]:before {
    transform: rotate(0.34turn);
  }

  .pie[data-value="35"]:before {
    transform: rotate(0.35turn);
  }

  .pie[data-value="36"]:before {
    transform: rotate(0.36turn);
  }

  .pie[data-value="37"]:before {
    transform: rotate(0.37turn);
  }

  .pie[data-value="38"]:before {
    transform: rotate(0.38turn);
  }

  .pie[data-value="39"]:before {
    transform: rotate(0.39turn);
  }

  .pie[data-value="40"]:before {
    transform: rotate(0.4turn);
  }

  .pie[data-value="41"]:before {
    transform: rotate(0.41turn);
  }

  .pie[data-value="42"]:before {
    transform: rotate(0.42turn);
  }

  .pie[data-value="43"]:before {
    transform: rotate(0.43turn);
  }

  .pie[data-value="44"]:before {
    transform: rotate(0.44turn);
  }

  .pie[data-value="45"]:before {
    transform: rotate(0.45turn);
  }

  .pie[data-value="46"]:before {
    transform: rotate(0.46turn);
  }

  .pie[data-value="47"]:before {
    transform: rotate(0.47turn);
  }

  .pie[data-value="48"]:before {
    transform: rotate(0.48turn);
  }

  .pie[data-value="49"]:before {
    transform: rotate(0.49turn);
  }

  .pie[data-value="50"]:before {
    transform: rotate(0.5turn);
  }

  .pie[data-value="51"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.01turn);
  }

  .pie[data-value="52"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.02turn);
  }

  .pie[data-value="53"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.03turn);
  }

  .pie[data-value="54"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.04turn);
  }

  .pie[data-value="55"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.05turn);
  }

  .pie[data-value="56"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.06turn);
  }

  .pie[data-value="57"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.07turn);
  }

  .pie[data-value="58"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.08turn);
  }

  .pie[data-value="59"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.09turn);
  }

  .pie[data-value="60"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.1turn);
  }

  .pie[data-value="61"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.11turn);
  }

  .pie[data-value="62"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.12turn);
  }

  .pie[data-value="63"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.13turn);
  }

  .pie[data-value="64"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.14turn);
  }

  .pie[data-value="65"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.15turn);
  }

  .pie[data-value="66"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.16turn);
  }

  .pie[data-value="67"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.17turn);
  }

  .pie[data-value="68"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.18turn);
  }

  .pie[data-value="69"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.19turn);
  }

  .pie[data-value="70"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.2turn);
  }

  .pie[data-value="71"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.21turn);
  }

  .pie[data-value="72"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.22turn);
  }

  .pie[data-value="73"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.23turn);
  }

  .pie[data-value="74"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.24turn);
  }

  .pie[data-value="75"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.25turn);
  }

  .pie[data-value="76"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.26turn);
  }

  .pie[data-value="77"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.27turn);
  }

  .pie[data-value="78"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.28turn);
  }

  .pie[data-value="79"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.29turn);
  }

  .pie[data-value="80"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.3turn);
  }

  .pie[data-value="81"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.31turn);
  }

  .pie[data-value="82"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.32turn);
  }

  .pie[data-value="83"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.33turn);
  }

  .pie[data-value="84"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.34turn);
  }

  .pie[data-value="85"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.35turn);
  }

  .pie[data-value="86"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.36turn);
  }

  .pie[data-value="87"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.37turn);
  }

  .pie[data-value="88"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.38turn);
  }

  .pie[data-value="89"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.39turn);
  }

  .pie[data-value="90"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.4turn);
  }

  .pie[data-value="91"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.41turn);
  }

  .pie[data-value="92"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.42turn);
  }

  .pie[data-value="93"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.43turn);
  }

  .pie[data-value="94"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.44turn);
  }

  .pie[data-value="95"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.45turn);
  }

  .pie[data-value="96"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.46turn);
  }

  .pie[data-value="97"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.47turn);
  }

  .pie[data-value="98"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.48turn);
  }

  .pie[data-value="99"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.49turn);
  }

  .pie[data-value="100"]:before {
    background-color: #4CC9D8;
    transform: rotate(0.5turn);
  } */

.meter {
    margin-top: 10px;
    margin-bottom: 10px;
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

.card {
    margin-top: 10px;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* .card:hover .card__image {
    filter: contrast(100%);
  } */
.card__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
}

/* .card__image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    filter: contrast(70%);
    overflow: hidden;
    position: relative;
    transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
  }
  .card__image::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }
  @media (min-width: 40rem) {
    .card__image::before {
      padding-top: 66.6%;
    }
  }
  .card__image--fence {
    background-image: url(https://www.b2bsustainable.com/wp-content/uploads/2022/02/2.jpg);
  } */
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
</style>
