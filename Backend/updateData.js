const CSVToJSON = require('csvtojson');
const db = require('./db')
const helper = require('./helper')
const config = require('./config')
const e = require("express")


//COURSE Data
//Course_ID,Course_Name,Course_Desc,Course_Status,Course_Type,Course_Category
var insertCourse  = 
`INSERT INTO spm.course (course_ID,course_Name,course_Desc,course_Status,course_Type,course_Category)
VALUES `;
CSVToJSON().fromFile('./Backend/RawData/courses.csv')
.then(courses => {
    courses.forEach(course => {
        insertCourse += `('${course.Course_ID}','${course.Course_Name}','${course.Course_Desc}',
        '${course.Course_Status}','${course.Course_Type}','${course.Course_Category}'),`
    });
    insertCourse = insertCourse.slice(0, -1);
    //console.log(insertCourse)
}).catch(err => {
    // log error if any
    console.log(err);
    return res.status(400).json({
        "Status": 400,
        "Message": err
    });
});
updateTable();
async function updateTable(){
    const deleteCourse = await db.query(
        `DELETE FROM spm.course`
    ).then(
       console.log("Cleared Course table") 
    );
    const course = await db.query(
        insertCourse
    ).then(
        console.log("Course table updated")
    );
    console.log(course);
}


