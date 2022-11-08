const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");


const skillLearntByUser = async (req, res) => {
    const identifier = req.params.id
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);

    const registration = await db.query(
        `SELECT * FROM spm.registration t1
        INNER JOIN spm.SkillCourse t2
        on t1.course_ID = t2.course_ID
         WHERE (t1.staff_ID ='${identifier}' AND t1.Completion_Status ="Completed")`
    ).catch(e=>{
        return res.status(400).json({
            status :400,
            result: "Error getting courses"
        })
    });
    return res.status(200).json(registration);
}

const updateRegistration = async (req,res) =>{
    const id = req.params.id

    const result = await db.query(
        `
        update spm.registration set Reg_Status = 'Registered'
        where Reg_ID = ${id}
        `

    ).catch(e=>{
        return res.status(400).json({
            status : 400,
            result : "Error Registering course"
        });
    });
    return res.status(200).json(result)
}

module.exports = {skillLearntByUser,updateRegistration};