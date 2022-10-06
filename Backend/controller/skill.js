const mongoose = require("mongoose")
const role = require("../models/role")
const skill = require("../models/skill")

const createSkill = async (req, res) => {

    try {
        const newSkill = new skill({ ...req.body });
        console.log(newSkill)
        const insertSkill = await newSkill.save();
        return res.status(200).json(insertSkill);
    } catch (error) {
        console.log(error);
        return res.status(404).json(error)
    }

};

const getAllSkills = async (req, res) => {
    const allSkills = await skill.find();
    return res.status(200).json(allSkills);
};

const getAllAvaliableSkills = async (req, res) => {
    const allSkills = await skill.find({ status: true });
    return res.status(200).json(allSkills);
};
const getSkill = async (req, res) => {
    const id = req.params;
    const allSkill = await skill.find({ skillName: id.id });
    return res.status(200).json(allSkill);
};

const updateSkill = async (req, res) => {
    const id = req.params;
    await skill.updateOne({ skillName: id.id }, req.body)
    return res.status(200).json({
        "message": "Skill updated success!",
        "skillName": id.id
    });
};

const deleteSkill = async (req, res) => {
    const id = req.params
    const data = {
        "status": false
    }
    await skill.updateOne({ skillName: id.id }, data)
    return res.status(200).json({
        "message": "Skill delete success! (Soft delete)",
        "skillName": id
    });
};
const activateSkill = async (req, res) => {
    const id = req.params
    const data = {
        "status": true
    }
    await skill.updateOne({ skillName: id.id }, data)
    return res.status(200).json({
        "message": "Skill is set back to available",
        "skillName": id
    });
};


// const getRoleSkills = async (req, res) => {
//     const allRole = await role.find();
//     return res.status(200).json(allRole);
// };


module.exports = { createSkill, getAllSkills, updateSkill, deleteSkill, getAllAvaliableSkills, getSkill, activateSkill }


