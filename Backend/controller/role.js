const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express")

const getAllRoles = async (req, res) =>{
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const roles = await db.query(
        `SELECT * FROM spm.LJMSRole`
    );
    const skills = await db.query(
        `select t1.roleID,t2.skillID,t2.skillName,t2.skillDetail from spm.RoleSkill t1
        inner join spm.Skill t2
        on t1.skillID = t2.skillID
        where t2.status = 1
        `
    );
    var result = [];
    roles.forEach(role => {
        var tempSkills = []
        skills.forEach(skill => {
            if (skill.roleID == role.roleID){
                tempSkills.push(skill.skillName);
            }
        });
        result.push({
            roleID: role.roleID,
            roleName: role.roleName,
            roleDetail: role.roleDetail,
            status: role.status,
            skillName : tempSkills
        });
    });
    //const data = helper.emptyOrRows(result);
    const meta = { page };
    return res.status(200).json(result)
}


const createRole = async (req, res) => {
    const role = req.body;
    const skills = role.skillName
    var roleDetail = "No description"
    if(skills.length == 0){
        return res.status(400).json({
            status:400,
            result:"A role must have at least one skill!"
        });
    };

    if(role.roleDetail){
        roleDetail = role.roleDetail;
    }
    const result = await db.query(
        `INSERT INTO spm.LJMSRole (roleName,roleDetail) VALUES 
        ("${role.roleName}","${roleDetail}")
        `
    ).catch(error =>{
        return res.status(400).json({
            status: 400,
            result: "Fail to create Role",
            data: role
        });
    });
    var whereConditon = `(`
    skills.forEach(skill => {
        whereConditon += `'${skill}',`
    });
    whereConditon = whereConditon.slice(0, -1);
    whereConditon += `)`

    const skill = await db.query(
        `
        select * from spm.Skill
        where skillName in ${whereConditon}
        `
    )
    console.log(whereConditon);
    console.log(skill)
    var sqlStr = `INSERT INTO RoleSkill (skillID,roleID) VALUES`;
    skill.forEach(s => {
        sqlStr += `(${s.skillID},${result.insertId}),`
    });
    sqlStr = sqlStr.slice(0, -1);
    console.log(sqlStr);
    const skillResult = await db.query(
        `
        ${sqlStr}
        `
    );
    return res.status(200).json({
        status : 200,
        result: {
            result,
            Msg: "RoleSkill added to table",
            skillName : skills
        }
    });
};

const getAllAvaliableRoles = async (req, res) => {
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const roles = await db.query(
        `SELECT * FROM spm.LJMSRole
        where status = 1`
    );
    const skills = await db.query(
        `select t1.roleID,t2.skillID,t2.skillName,t2.skillDetail from spm.RoleSkill t1
        inner join spm.Skill t2
        on t1.skillID = t2.skillID
        where t2.status = 1
        `
    );
    var result = [];
    roles.forEach(role => {
        var tempSkills = []
        skills.forEach(skill => {
            if (skill.roleID == role.roleID){
                tempSkills.push(skill.skillName);
            }
        });
        result.push({
            roleID: role.roleID,
            roleName: role.roleName,
            roleDetail: role.roleDetail,
            skillName : tempSkills
        });
    });
    //const data = helper.emptyOrRows(result);
    const meta = { page };
    return res.status(200).json(result)
};

const getRole = async (req, res) => {
    const identifier = req.params.id
    const page = 1;
    const offset = helper.getOffset(page, config.listperPage);
    const role = await db.query(
        `SELECT * FROM spm.LJMSRole
        WHERE roleID = ${identifier}`
    ).catch(error =>{
        return res.status(400).json({
            status : 400,
            result : "Role does not exist: " + identifier 
        });
    });
    const skills = await db.query(
        `select t2.skillID,t2.skillName,t2.skillDetail from spm.RoleSkill t1
        inner join spm.Skill t2
        on t1.skillID = t2.skillID
        inner join spm.LJMSRole t3
        on t1.roleID = t3.roleID
        where t3.roleName = '${identifier}'
        and t2.status = 1
        `
    );
    const roleData = helper.emptyOrRows(role);
    const skillData = helper.emptyOrRows(skills);
    const meta = { page };
    return res.status(200).json({
        roleID: roleData[0].roleID,
        roleName: roleData[0].roleName,
        roleDetail: roleData[0].roleDetail,
        status: roleData[0].status,
        skillData
    });
};

const updateRole = async (req, res) => {
    const role = req.body;
    const identifier = req.params.id;
    const result = await db.query(
        `UPDATE spm.LJMSRole
        SET roleName = '${role.roleName}',
        roleDetail = '${role.roleDetail}'
        WHERE roleID =  ${identifier}
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to update role"
        });
    });
    console.log(role.skillName);
    const removeRoleSkill = await db.query(
        `
        delete from spm.RoleSkill
        where roleID = ${identifier}
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to update roleSkills"
        });
    });
    const allSkills = await db.query(
        `
        select * from spm.Skill
        `
    );
    var sqlStr = `INSERT INTO spm.RoleSkill (skillID,roleID) VALUES`;
    allSkills.forEach(skill => {
        if(role.skillName.includes(skill.skillName)){
            sqlStr += `(${skill.skillID},${identifier}),`
        }
    });
    //console.log(removeRoleSkill);
    sqlStr = sqlStr.slice(0, -1);
    console.log(sqlStr);
    const skillResult = await db.query(
        `
        ${sqlStr}
        `
    );
    return res.status(200).json({
        status : 200,
        result: "Updated successfully"
    });

};

const deleteRole = async (req, res) => {
    const identifier = req.params.id;
    const result = await db.query(
        `UPDATE spm.LJMSRole
        SET status = 0
        WHERE roleID = ${identifier}
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to soft delete role: " + identifier
        });
    })
    return res.status(200).json({
        status : 200,
        result: result
    });
};
const activateRole = async (req, res) => {
    const identifier = req.params.id;
    const result = await db.query(
        `UPDATE spm.LJMSRole
        SET status = 1
        WHERE roleID = ${identifier}
        `
    ).catch(e =>{
        return res.status(400).json({
            status : 400,
            result : "Fail to activate role: " + identifier
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


module.exports = { createRole, getAllRoles, updateRole, deleteRole, getRole, getAllAvaliableRoles, activateRole }


