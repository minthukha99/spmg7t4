const db = require('../db')
const helper = require('../helper')
const config = require('../config')
const e = require("express");



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

module.exports = {updateRegistration};