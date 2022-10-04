const express = require('express')
const router = express.Router()
const roleController =  require('./controller/role')
const skillController =  require('./controller/skill')
//  Create route handler

//Controller routes
//Roles
router.post("/role", roleController.createRole);
router.get("/roles", roleController.getAllRoles);
router.get("/avaliableroles", roleController.getAllAvaliableRoles);
router.get("/role/:id", roleController.getRole);
router.put("/updaterole/:id", roleController.updateRole);
router.put("/deleterole/:id", roleController.deleteRole);


//Roles
router.post("/skill", skillController.createSkill);
router.get("/skills", skillController.getAllSkills);
router.get("/avaliableskills", skillController.getAllAvaliableSkills);
router.get("/skill/:id", skillController.getSkill);
router.put("/updateskill/:id", skillController.updateSkill);
router.put("/deleteskill/:id", skillController.deleteSkill);

module.exports = router