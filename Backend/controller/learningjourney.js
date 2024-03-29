const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");
const { json } = require('express');

const createLJ = async (req, res) => {
    const LJInfo = req.body;
    const result = await db.query(
        `INSERT INTO spm.LearningJourney (roleID,staff_ID) values
        ((select roleID from spm.LJMSRole where roleName = '${LJInfo.roleName}'),
        '${LJInfo.staff_ID}')
        `

    ).catch(error => {
        return res.status(400).json({
            status: 400,
            result: "Fail to create LJ"
        });
    });
    var insertStr = `Insert into spm.LearningJourneyCourse(LJID,course_ID) values `
    LJInfo.course_ID.forEach( list =>{
        list.forEach(c=>{
            insertStr += `('${result.insertId}','${c}'),`
        });
    });
    insertStr = insertStr.slice(0, -1);
    const insertResult = await db.query(
        insertStr
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Fail to add course to LJ"
        });
    });
    var insertRegistration = `insert into spm.registration (course_ID, staff_ID, Reg_Status, Completion_Status)
    values `;
    var alreadyRegister = await db.query(
        `
        select course_ID from spm.registration
        where staff_ID = '${LJInfo.staff_ID}'
        and Reg_Status != 'Rejected'
        `
    );
    alreadyRegister = alreadyRegister.map(function (obj) {
        return obj.course_ID;
      });
    var newCourse = false
    LJInfo.course_ID.forEach(list =>{
        list.forEach(c=>{
            if(!alreadyRegister.includes(c)){
                newCourse = true
                console.log(alreadyRegister.includes(c));
                insertRegistration += `('${c}','${LJInfo.staff_ID}','Waitlist',''),`
            }
        })
    });
    insertRegistration = insertRegistration.slice(0, -1);
    if(!newCourse){
        return res.status(200).json({
            status: 200,
            result: "All select already registered"
        });
    }
    const registrationResult = await db.query(
        insertRegistration
    ).catch(e=>{
        return res.status(400),json({
            status:400,
            result: "Error registering course"
        });
    });

    return res.status(200).json({
        status: 200,
        result: registrationResult
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

const deleteLj = async (req, res) => {
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
    ).catch(error => {
        return res.status(400).json({
            status: 400,
        })
    });
    return res.status(200).json("Success")

};

const addCourseToLJ = async (req, res) => {
    const data = req.body;
    var insertStr = `Insert into spm.LearningJourneyCourse(LJID,course_ID) values `
    data.course_ID.forEach(c => {
        insertStr += `('${data.LJID}','${c}'),`
    });
    insertStr = insertStr.slice(0, -1);
    const result = await db.query(
        insertStr
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Fail to add course to LJ"
        });
    });
    return res.status(200).json(result);
}

const updateCourseFromLJ = async (req, res) => {
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
    data.course_ID.forEach(list => {
        list.forEach(c=>{
            insertStr += `('${data.LJID}','${c}'),`
        });
    });
    insertStr = insertStr.slice(0, -1);
    const result = await db.query(
        insertStr
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Fail to add course to LJ"
        });
    });
    return res.status(200).json(result);
}

const getInfoAboutLJ = async (req, res) => {
    const id = req.params.id;

    const LJInfo = await db.query(
        `
        select * from spm.LearningJourney t0
        inner join spm.LJMSRole t1
        on t0.roleID =t1.roleID
        where LJID = '${id}'
        `
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Error in getting LJ info"
        });
    });
    const skillNeededForRole = await db.query(
        `
        select t3.skillName,t3.skillDetail,t3.skillDetail,t3.status from spm.LearningJourney t0
        inner join spm.LJMSRole t1
        on t0.roleID = t1.roleID
        inner join spm.RoleSkill t2
        on t1.roleID = t2.roleID
        inner join spm.Skill t3
        on t2.skillID = t3.skillID
        where t0.LJID = '${id}'
        `
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Error in getting Skills needed for role"
        });
    });

    const courseRegistered = await db.query(
        `
        select * from spm.LearningJourneyCourse t0
        inner join spm.SkillCourse t1
        on t0.course_ID = t1.course_ID
        inner join spm.course t4
        on t0.course_ID = t4.course_ID
        inner join spm.Skill t2
        on t1.skillID = t2.skillID
        inner join spm.registration t3
        on t3.course_ID = t0.course_ID 
        where t0.LJID = ${id}
        and t3.staff_ID = (select staff_ID from spm.LearningJourney where LJID = ${id})
        `
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Error in getting course for LJ"
        });
    });
    // const staffCourseInfo = await db.query(
    //     `
    //     select * from spm.registration
    //     where staff_ID = (select staff_ID from spm.LearningJourney
    //     where LJID = ${id})
    //     `

    // )
    return res.status(200).json({
        LJInfo,
        skillNeededForRole,
        courseRegistered
        //staffCourseInfo
    });


}
module.exports = { getInfoAboutLJ, createLJ, GetLjbyStaffID, deleteLj, addCourseToLJ, updateCourseFromLJ }

