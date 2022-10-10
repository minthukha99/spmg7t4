const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skillName: { type: String, required: [true, "Skill name is required"], unique: true },
    roleName: { type: Array, required: [true, "Role is required for skill creation"], default: [] },
    skillDetail: {type: String, required:[true, "Please provide details for the skill"]},
    courses: { type: Array, required: true, default: [] },
    //for soft delete
    status: { type: Boolean, default: true }
});

const skill = mongoose.model("skill", skillSchema);
module.exports = skill;