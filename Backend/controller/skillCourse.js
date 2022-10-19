const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");

const assignSkillToCourse = async (req, res) => {
    const data = req.body;
    const result = await db.query(
        `INSERT INTO spm.SkillCourse (skillID,course_ID) values
        ((select skillID from spm.Skill where skillName = '${data.skillName}'),
        '${data.course_ID}')
        `

    ).catch(error => {
        return res.status(400).json({
            status: 400,
            result: "Fail to assign skill to course"
        });
    });

    return res.status(200).json({
        status: 200,
        result: result
    });
};

const deleteSkillFromCourse = async (req, res) => {
    const data = req.body;
    const result = await db.query(
        `delete from spm.SkillCourse 
        where (course_ID = '${data.course_ID}' 
        and skillID = (select skillID from spm.Skill where skillName = '${data.skillName}'))
        `

    ).catch(error => {
        return res.status(400).json({
            status: 400,
            result: "Fail to delete skill from course"
        });
    });

    return res.status(200).json({
        status: 200,
        result: result
    });
};
module.exports = { assignSkillToCourse, deleteSkillFromCourse }


