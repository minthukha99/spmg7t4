<template>
  <header>
    <div class="courseList">
      <div class="row">
        <div class="col">
          <h1>Courses</h1>
        </div>  
        <div class="col">
          <div class="d-flex">
          </div>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">Course Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action 1</th>
              <th scope="col">Action 2</th>
    
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course,index) in coursesList" :key="course.id">
              <td scope="row" data-label="Index">{{ index +1}}</td>
              <td scope="row" data-label="courseName">{{ course.id }}</td>
              <td scope="row" data-label="courseName">{{ course.courseName }}</td>
              <!-- <td scope="row" data-label="courseDesc">{{ course.courseDesc }}</td>
              <td scope="row" data-label="courseName">{{ course.courseCat }}</td>
              <td scope="row" data-label="courseName">{{ course.courseType }}</td> -->
              <td scope="row" data-label="courseStatus">{{ course.courseStatus }}</td>
            
              <!-- show in bullet point if got data, else dash -->
              <!-- <td v-if="skill.roleName =='' ">
                -
              </td>
              <td v-else>
                <ul scope="row" data-label="skillName" v-for="x in skill.roleName" :key="x">
                  <li>{{x}}</li>
                </ul>
              </td> -->
            
              <!-- <td v-if="skill.status ==false " class="inactive">
                <p>Inactive</p>
              </td>
              <td v-else class="active">
                <p>Active</p>
              </td> -->
              <!-- <td scope="row" data-label="Action 1"><a href="#">Edit</a>
              </td> -->
            
              <td v-if="course.courseStatus == 'Active'" class="deactive">
                <a>Deactivate</a>
              </td>

              <td  v-else-if="course.courseStatus == 'Retired'" class="retired">
                <a>Activate</a>
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
  </header>
</template>
  
<script>
import axios from "axios";
export default {
  name: 'Courses',
  mounted() {
    this.getCourses()
  },

  data() {
    return {
      coursesList: []
    }
  },

  methods: {
    getCourses() {
      const url = "http://localhost:3000/courses";
      axios.get(url)
        .then(response => {
          var coursesData = response.data
          for (var course of coursesData) {
            console.log(course)
            this.coursesList.push(
              {
                id: course.Course_ID,
                courseCat: course.Course_Category,
                courseDesc: course.Course_Desc,
                courseName: course.Course_Name,
                courseStatus: course.Course_Status,
                courseType: course.Course_Type
              }
            );
          }
      
        })
        .catch(error => {
          console.log(error.message)
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  margin-top: 20px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}

.courseList {
  width: 80%;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
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

@media screen and (max-width: 700px) {
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

button {
  background-color: #000;
  color: white; 
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
}

.special {
  color:white; 
  text-decoration: none;
}

a{
  color: blue;
  text-decoration: underline;
}
</style>
  