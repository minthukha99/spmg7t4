const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");

const createSkill = async (req, res) => {
    const skill = req.body;
    var skillDetail = "No description";
    if(skill.skillDetail){
        skillDetail = skill.skillDetail;
    }
    const result = await db.query(
        `INSERT INTO spm.Skill (skillName,skillDetail) VALUES 
        ("${skill.skillName}","${skillDetail}")
        `

    ).catch(error =>{
        return res.status(400).json({
            status: 400,
            result: "Fail to create Skill"
        });
    });

    return res.status(200).json({
        status : 200,
        result: result
    });
};

const getAllSkills = async (req, res) =>{
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const skills = await db.query(
        `SELECT * FROM spm.Skill`
    );
    const roles = await db.query(
        `select t1.skillID,t2.roleID,t2.roleName,t2.roleDetail from spm.RoleSkill t1
        inner join spm.LJMSRole t2
        on t1.roleID = t2.roleID
        where t2.status = 1
        `
    );
    var result = [];
    skills.forEach(skill => {
        var tempRoles = []
        roles.forEach(role => {
            if (skill.skillID == role.skillID){
                tempRoles.push(role.roleName);
            }
        });
        result.push({
            skillID: skill.skillID,
            skillName: skill.skillName,
            skillDetail: skill.skillDetail,
            status:skill.status,
            roleName : tempRoles
        });
    });
    //const data = helper.emptyOrRows(result);
    const meta = { page };
    return res.status(200).json(result);
}

const getAllAvaliableSkills = async (req, res) => {
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const skills = await db.query(
        `SELECT * FROM spm.Skill
        where status = 1
        `
    );
    const roles = await db.query(
        `select t1.skillID,t2.roleID,t2.roleName,t2.roleDetail from spm.RoleSkill t1
        inner join spm.LJMSRole t2
        on t1.roleID = t2.roleID
        where t2.status = 1
        `
    )
    var result = [];
    skills.forEach(skill => {
        var tempRoles = []
        roles.forEach(role => {
            if (skill.skillID == role.skillID){
                tempRoles.push(role.roleName);
            }
        });
        result.push({
            skillID: skill.skillID,
            skillName: skill.skillName,
            skillDetail: skill.skillDetail,
            status:skill.status,
            roleName : tempRoles
        });
    });
    //const data = helper.emptyOrRows(result);
    const meta = { page };
    return res.status(200).json(result)
};
const getSkill = async (req, res) => {
    const identifier = req.params.id
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const skill = await db.query(
        `SELECT * FROM spm.Skill
        WHERE (skillID = '${identifier}' OR skillName = '${identifier}')`
    ).catch(error =>{
        return res.status(400).json({
            status : 400,
            result : "Skill does not exist: " + identifier 
        });
    });
    const roles = await db.query(
        `select t2.roleID,t2.roleName from spm.RoleSkill t1
        inner join spm.LJMSRole t2
        on t1.roleID = t2.roleID
        inner join spm.Skill t3
        on t1.skillID = t3.skillID
        where (t3.skillID = '${identifier}' or t3.skillName = '${identifier}')
        and t2.status = 1`
    )
    const roleData = helper.emptyOrRows(roles);
    const skillData = helper.emptyOrRows(skill);
    const meta = { page };
    return res.status(200).json({
        skillID: skillData[0].skillID,
        skillName: skillData[0].skillName,
        skillDetail: skillData[0].skillDetail,
        status: skillData[0].status,
        roleData
    });
};
const getskillsByCourse = async (req, res) => {
    const identifier = req.params.course
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const skill = await db.query(
        `SELECT t1.skillID,t1.skillName,t1.skillDetail,t1.status FROM spm.SkillCourse t0
        inner join spm.Skill t1
        on t0.skillID = t1.skillID
        WHERE t0.course_ID = '${identifier}'`
    ).catch(error =>{
        return res.status(400).json({
            status : 400,
            result : "Skill does not exist: " + identifier 
        });
    });
    const meta = { page };
    return res.status(200).json(skill);
};
const updateSkill = async (req, res) => {
    const identifier = req.params.id;
    const skillData = req.body
    var skillDetail = "No description";
    if(skillData.skillDetail){
        skillDetail = skillData.skillDetail;
    }
    const result = await db.query(
        `UPDATE spm.Skill
        SET skillName = '${skillData.skillName}',skillDetail = '${skillDetail}'
        WHERE skillName = '${identifier}'
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to update skill: " + identifier
        });
    })
    return res.status(200).json({
        status : 200,
        result: "update successful!"
    });
};

const deleteSkill = async (req, res) => {
    const identifier = req.params.id;
    const result = await db.query(
        `UPDATE spm.Skill
        SET status = 0
        WHERE skillID = '${identifier}' or skillName = '${identifier}'
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to soft delete skill: " + identifier
        });
    })
    return res.status(200).json({
        status : 200,
        result: result
    });
};
const activateSkill = async (req, res) => {
    const identifier = req.params.id;
    const result = await db.query(
        `UPDATE spm.Skill
        SET status = 1
        WHERE skillID = '${identifier}' or skillName = '${identifier}'
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to activate skill: " + identifier
        });
    })
    return res.status(200).json({
        status : 200,
        result: result
    });
};



// const getRoleSkills = async (req, res) => {
//     const allRole = await role.find();
//     return res.status(200).json(allRole);
// };


module.exports = {getskillsByCourse, createSkill, getAllSkills, updateSkill, deleteSkill, getAllAvaliableSkills, getSkill, activateSkill }


