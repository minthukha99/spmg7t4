const mongoose = require("mongoose")
const role = require("../models/role")
const skill = require("../models/skill")

const createRole = async (req, res) => {

    try {
        const newRole = new role({ ...req.body });
        console.log(newRole)
        const insertRole = await newRole.save();
        return res.status(200).json(insertRole);
    } catch (error) {
        console.log(error);
        return res.status(404).json(error)
    }

};


const getAllRoles = async (req, res) => {
    const allRole = await role.find();
    return res.status(200).json(allRole);
};

const getAllAvaliableRoles = async (req, res) => {
    const allRole = await role.find({ status: true });
    return res.status(200).json(allRole);
};
const getRole = async (req, res) => {
    const id = req.params;
    const allRole = await role.find({ roleName: id.id });
    return res.status(200).json(allRole);
};

const updateRole = async (req, res) => {
    const id = req.params;
    await role.updateOne({ roleName: id.id }, req.body)
    return res.status(200).json({
        "message": "Role updated success!",
        "Rolename": id
    });
};

const deleteRole = async (req, res) => {
    const id = req.params
    const data = {
        "status": false
    }
    await role.updateOne({ roleName: id.id }, data)
    return res.status(200).json({
        "message": "Role delete success! (Soft delete)",
        "Rolename": id
    });
};
const activateRole = async (req, res) => {
    const id = req.params
    const data = {
        "status": true
    }
    await role.updateOne({ roleName: id.id }, data)
    return res.status(200).json({
        "message": "Role status is set back to available",
        "Rolename": id
    });
};



// const getRoleSkills = async (req, res) => {
//     const allRole = await role.find();
//     return res.status(200).json(allRole);
// };


module.exports = { createRole, getAllRoles, updateRole, deleteRole, getRole, getAllAvaliableRoles, activateRole }


