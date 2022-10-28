const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");



const registerCourse = async (req,res) =>{
    const data = req.body

    const result = await db.query(
        `
        insert into spm.registration values(
            '${data.course_ID}',
            ${data.staff_ID},
            'waitlist',
            ''
        )

        `

    ).catch(e=>{
        return res.status(400).json({
            status : 400,
            result : "Error Adding Record"
        });
    });
    return res.status(200).json(result)
}

module.exports = {coursesCompletedByTeam};