<template>
  <div class="header">
    <div class="header-middle-text">
      <h1>Courses</h1>
      <table>
        <tr>
          <td>
            <input type="text" v-model="searchValue" placeholder="Search Course"/>
          </td>
          <td>
            <input type="text" v-model="searchValue" placeholder="Search Course by Learning Journey"/>
          </td>
          <td>
            <select v-model="selectedSkill">
              <option selected="true"></option>
              <option v-for="skill in skillsList" :key="skill.skillID">{{skill.skillName}}</option>
            </select>
          </td>
        </tr>
      </table>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action 1</th>
              <th scope="col">Action 2</th>
    
            </tr>
          </thead>
          <tbody v-if="this.selectedSkill!='' && this.searchValue == ''">
            <tr v-for="(course, index) in filteredSkillCourses" :key="course.courseName">
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

              <td  v-else-if="course.courseStatus == 'Retired'" data-label="Action 2">
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
          <tbody v-else-if="this.searchValue!='' && this.selectedSkill==''">
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

              <td  v-else-if="course.courseStatus == 'Retired'" data-label="Action 2">
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
          <tbody v-else>
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

              <td v-if="course.courseStatus == 'Active'" data-label="Action 2">
                <a class="mouseover" v-on:click="deactivateCourses(course.id)">Deactivate</a>
              </td>

              <td  v-else-if="course.courseStatus == 'Retired'" data-label="Action 2">
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
    }
  },

  methods: {

    deactivateCourses(courseID) {

      let url = "http://localhost:3000/deactivecourse/"+courseID;
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

      let url = "http://localhost:3000/activatecourse/"+courseID;
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
    filteredCourses(){
      // console.log(this.coursesList)
      if (this.searchValue != " "){
        return this.coursesList.filter(course => 
          course.courseName.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      } 
    },

    filteredSkillCourses(){
      const url2 = "http://localhost:3000/coursebyskill/" + this.selectedSkill;
      axios.get(url2)
      .then(response => {
        console.log(typeof(this.selectedSkill))
        var courses = response.data
        console.log(courses)
        for (var course of courses) {
          this.courseSkillList.push(
            {
              id: course.course_ID,
              courseCat: course.course_Category,
              courseDesc: course.course_Desc,
              courseName: course.course_Name,
              courseStatus: course.course_Status,
              courseType: course.course_Type
            }
          );
        }
      })
      .catch(error => {
        console.log(error.message)
      })
      return this.courseSkillList
    }
  },

  created(){
    const url = "http://localhost:3000/courses";
    axios.get(url)
    .then(response => {
      var coursesData = response.data
      for (var course of coursesData) {
        // console.log(course)
        this.coursesList.push(
          {
            id: course.course_ID,
            courseCat: course.course_Category,
            courseDesc: course.course_Desc,
            courseName: course.course_Name,
            courseStatus: course.course_Status,
            courseType: course.course_Type
          }
        );
      }
    })
    .catch(error => {
      console.log(error.message)
    })

    const url1 = "http://localhost:3000/skills";
      axios.get(url1)
      .then(response => {
        var skillData = response.data
        // console.log("SkillData=", skillData)
        for (var skill of skillData) {
          this.skillsList.push(
            {
              roles: skill.roleName,
              skillDetail: skill.skillDetail,
              skillID: skill.skillID,
              skillName: skill.skillName,
              status: skill.status
            }
          );
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

select {
  margin: 0px;
  width: 76%;
}
</style>
  