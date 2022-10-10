<template>
    <header>
        <div class="lj">
            <div class="ljcomponent">
                <h1>Human Resource Personnel</h1>
                <div class="meter">
                    <span style="width: 25%"></span>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                        <!-- <th scope="col">Index</th> -->
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Action 1</th>
                
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(course) in coursesList" :key="course.id">
                        <!-- <td scope="row" data-label="Index">{{ index +1}}</td> -->
                        <td scope="row" data-label="Course Code">{{ course.id }}</td>
                        <td scope="row" data-label="Course Name">{{ course.courseName }}</td>
                        <td scope="row" data-label="Action 1">
                            <a href="#">Remove</a>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </header>
</template>
  
<script>
    import axios from 'axios';

    export default {
        name: 'Learning Journey Profile',
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

    .lj {
        width: 80%;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
    }

    .ljcomponent {
        margin-top: 10px;
        width: 75%;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
    }

    .meter {
        box-sizing: content-box;
        height: 20px; /* Can be anything */
        position: relative;
        background: #555;
        border-radius: 25px;
        padding:2px;
    }
    .meter > span {
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
    .meter > span:after,
    .animate > span > span {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
        );
        z-index: 1;
        background-size: 50px 50px;
        animation: move 2s linear infinite;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        overflow: hidden;
    }

    .animate > span:after {
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

    a{
        color: blue;
        text-decoration: underline;
    }
</style>
  