const CSVToJSON = require('csvtojson');
const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express")


const getAllCourse = async (req, res) => {
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const course = await db.query(
        `SELECT * FROM spm.course`
    );
    return res.status(200).json(course);
};

const getCoursesBySkill = async (req, res) => {
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const skillName = req.params.skillName
    const courses = await db.query(
        `SELECT t1.course_ID,t1.course_Name,t1.course_Desc,t1.course_Status,t1.course_Type,t1.course_Category FROM spm.SkillCourse t0
        inner join course t1
        on t0.course_ID = t1.course_ID 
        where skillID = (SELECT skillID from spm.Skill where skillName = '${skillName}')
        `
    );
    return res.status(200).json(courses);
};
const getCourse = async (req, res) => {
    const id = req.params.id;
    const course = await db.query(
        `
        select * from spm.course 
        where course_ID = '${id}'
        `
    );
    const skills = await db.query(
        `
        select t1.skillID, t1.skillName, t1.skillDetail, t1.status from spm.SkillCourse t0
        inner join Skill t1 
        on t0.skillID = t1.skillID
        where t0.course_ID = '${id}'
        `
    )
    return res.status(200).json({
        // course_ID: course[0].course_ID,
        // course_Name: course[0].course_Name,
        // course_Desc: course[0].course_Desc,
        // course_Status: course[0].course_Status,
        // course_Type: course[0].course_Type,
        // course_Category: course[0].course_Category,
        skillName: skills
    });
};

const deactiateCourse = async (req, res) => {
    const id = req.params.id;
    const course = await db.query(
        `UPDATE spm.course 
        SET course_Status = "Retired"
        WHERE course_ID = '${id}' `
    ).then(r => {
        return res.status(200).json({
            status: 200,
            result: "Course deactivated"
        })
    }).catch(err => {
        return res.Status(400).json({
            status: 200,
            result: "Fail to deactivate course " + id
        })
    });

};
const activateCourse = async (req, res) => {
    const id = req.params.id;
    const course = await db.query(
        `UPDATE spm.course 
        SET course_Status = "Active"
        WHERE course_ID = '${id}' `
    ).then(r => {
        return res.status(200).json({
            status: 200,
            result: "Course activated"
        })
    }).catch(err => {
        return res.Status(400).json({
            status: 200,
            result: "Fail to activate course " + id
        })
    });

}

const getAllUser = async (req, res) => {
    CSVToJSON().fromFile('./Backend/RawData/staff.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            //console.log(users);
            return res.status(200).json(users);
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });

};

const getUser = async (req, res) => {
    const id = req.params;
    var found = false;
    await CSVToJSON().fromFile('./Backend/RawData/staff.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            users.forEach(user => {
                if (user.Staff_ID == id.id) {
                    found = true;
                    return res.status(200).json(user);
                }
            });
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });
    if (!found) {
        return res.status(404).json({
            "Status": 404,
            "Message": "Invalid user ID : " + id.id
        });
    }
};

const getUserByDept = async (req, res) => {
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const dept = req.params.dept
    const course = await db.query(
        `select * from spm.staff
        where dept = '${dept}'
        and role != 3`
    );
    return res.status(200).json(course);

};
const getUserByEmail = async (req, res) => {
    const email = req.body.email;
    var found = false;
    var getUser;
    await CSVToJSON().fromFile('./Backend/RawData/staff.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            users.forEach(user => {
                if (user.Email == email) {
                    found = true;
                    getUser = user;
                }
            });
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });
    if (!found) {
        return res.status(404).json({
            "Status": 404,
            "Message": "User not found Invalid user Email : " + email
        });
    } else {
        return res.status(200).json(getUser);
    }
};
// const learningJourneyByID = async (req, res) => {
//     const id = req.params.id
//     var resultData = [];
//     CSVToJSON().fromFile('./Backend/RawData/registration.csv')
//         .then(users => {
//             // users is a JSON array
//             // log the JSON array
//             //console.log(users);
//             users.forEach(user => {
//                 if (user.Staff_ID == id) {
//                     resultData.push(user);
//                 }
//             });
//             return res.status(200).json(resultData);
//         }).catch(err => {
//             // log error if any
//             console.log(err);
//             return res.status(400).json({
//                 "Status": 400,
//                 "Message": err
//             });
//         });
// };

const insertLJToDatabase = async (req, res) => {
    // const course = await db.query(
    //     `select * from spm.registration
    //     order by staff_ID
    //     `
    // )
    // var tempID = "";
    // var LJID = 1;
    // var insert = `insert into spm.LearningJourney (LJID,roleID,staff_ID) values `;
    // var insert2 = `insert into spm.LearningJourneyRegistration (LJID,Reg_ID) values`
    // course.forEach(c => {
    //     if (tempID == "") {
    //         tempID = c.staff_ID;
    //         insert += `(${LJID},${1},${c.staff_ID}),`
    //     }
    //     if (tempID == c.staff_ID) {
    //         insert2 += `(${LJID},${c.Reg_ID}),`
    //     } else {
    //         tempID = c.staff_ID
    //         LJID += 1;
    //         insert += `(${LJID},${1},${c.staff_ID}),`;
    //         insert2 += `(${LJID},${c.Reg_ID}),`;
    //     }
    // });
    // console.log(insert)
    // console.log(insert2)
    // return res.status(200).json(course);
}


module.exports = { insertLJToDatabase, getUserByDept, getCoursesBySkill, activateCourse, deactiateCourse, getAllCourse, getCourse, getAllUser, getUser, getUserByEmail }


