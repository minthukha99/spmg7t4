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

    ).catch(error =>{
        return res.status(400).json({
            status: 400,
            result: "Fail to create LJ"
        });
    });

    return res.status(200).json({
        status : 200,
        result: result
    });
};
module.exports = {createLJ }


