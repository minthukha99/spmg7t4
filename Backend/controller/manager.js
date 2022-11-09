const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");



const coursesCompletedByTeam = async (req,res) =>{
    const managerID = req.params.id

    const result = await db.query(
        `
        select * from spm.staff t0
        inner join spm.registration t1
        on t0.staff_ID = t1.staff_ID
        inner join spm.course t2
        on t2.course_ID = t1.course_ID
        where dept = (select dept from spm.staff where staff_ID = ${managerID})
        and role != 3
        and t2.course_Status = "Active"

        `

    ).catch(e=>{
        return res.status(400).json({
            status : 400,
            result : "Error retrieving"
        });
    });
    return res.status(200).json(result)
}

module.exports = {coursesCompletedByTeam};