const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: [true, "Role name is required"], unique: true},
    skillName: { type: Array, required: false, default:[]},
    //for soft delete
    status: {type: Boolean, default: true}
});

const role = mongoose.model("Role", roleSchema);
module.exports= role;