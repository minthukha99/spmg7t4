const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");

const createLJ = async (req, res) => {
    const LJInfo = req.body;
    const result = await db.query(
        `INSERT INTO spm.LearningJourney (roleID,staff_ID) values
        ('select roleID from spm.role where roleName = '${LJInfo.roleName}'',
        '${LJInfo.staff_ID}')
        `

    ).catch(error => {
        return res.status(400).json({
            status: 400,
            result: "Fail to create LJ"
        });
    });

    return res.status(200).json({
        status: 200,
        result: result
    });
};
const GetLjbyStaffID = async (req, res) => {
    const staff_ID = req.params.id;
    const result = await db.query(
        `
        SELECT * FROM spm.LearningJourney
        where staff_ID= '${staff_ID}'
        `
    ).catch(error => {
        return res.status(400).json({
            status: 400,
            result: "Fail to retrieve LR for user " + staff_ID
        })
    });
    return res.status(200).json(result);
};

const deleteLj = async (req,res) => {
    const LJID = req.params.id;
    const coursesInLJ = await db.query(
        `
        delete from spm.LearningJourneyCourse
        where LJID = '${LJID}'
        `
    );
    const LJ = await db.query(
        `
        delete from spm.LearningJourney
        where LJID = '${LJID}'
        `
    )
     
};

const addCourseToLJ = async (req,res) => {
    const data = req.body;
    var insertStr = `Insert into spm.LearningJourneyCourse(LJID,course_ID) values `
    data.course_ID.forEach(c => {
        insertStr += `('${data.LJID}','${c}'),`
    });
    insertStr = insertStr.slice(0, -1);
    const result = await db.query(
        insertStr
    ).catch(e=>{
        return res.status(400).json({
            status : 400,
            result : "Fail to add course to LJ"
        });
    });

    return res.status(200).json(result);
}

const updateCourseFromLJ = async (req,res) => {
    const data = req.body;
    
    //delete all the courses
    const deleteAll = await db.query(
        `
        delete from spm.LearningJourneyCourse 
        where LJID = '${data.LJID}'
        `
    );

    //re insert the updated courses into LearningJOurneyCourses
    var insertStr = `Insert into spm.LearningJourneyCourse(LJID,course_ID) values `
    data.course_ID.forEach(c => {
        insertStr += `('${data.LJID}','${c}'),`
    });
    insertStr = insertStr.slice(0, -1);
    const result = await db.query(
        insertStr
    ).catch(e=>{
        return res.status(400).json({
            status : 400,
            result : "Fail to add course to LJ"
        });
    });
}

module.exports = { createLJ, GetLjbyStaffID, deleteLj, addCourseToLJ, updateCourseFromLJ}


