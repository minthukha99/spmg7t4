<template>
<div class="header">
    <div class="header-middle-text">
        {{id}}
        <h1>Human Resource Personnel</h1>
        <div class="meter">
            <span style="width: 25%"></span>
        </div>
        <br>
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
            skillCourseList: [],
            roleName: '',
        }
    },

    methods: {
        getLearningJourneyInfo() {
            const url = "http://localhost:3000/learningjourneyinfo/" + this.id;
            axios.get(url)
                .then(response => {
                    var ljInfoData = response.data
                    console.log(ljInfoData)
                    // console.log(ljInfoData.LJInfo[0].roleName) 
                    this.roleName = ljInfoData.LJInfo[0].roleName

                    // console.log(ljInfoData.LJInfo.roleName)

                    // for (var data of ljInfoData) {
                    //     console.log(data)
                    //     console.log(ljInfoData.LJInfo.roleName)
                    // }

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
</style>
