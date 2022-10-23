const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");

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
    )

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
        select * from spm.LearningJourneyCourse
        where LJID = '${id}'
        `
    ).catch(e => {
        return res.status(400).json({
            status: 400,
            result: "Error in getting course for LJ"
        });
    });

    return res.status(200).json({
        LJInfo,
        skillNeededForRole,
        courseRegistered
    });


}

module.exports = { getInfoAboutLJ, createLJ, GetLjbyStaffID, deleteLj, addCourseToLJ, updateCourseFromLJ }

