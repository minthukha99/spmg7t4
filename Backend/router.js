const express = require('express')
const router = express.Router()
const roleController =  require('./controller/role')
const skillController =  require('./controller/skill')
const coursesController =  require('./controller/ExternalData')
const skillCourseController = require('./controller/skillCourse')
const LjController = require('./controller/learningjourney')
const managerController = require('./controller/manager')
const registerController = require('./controller/registercourse')
//  Create route handler

//Controller routes
//Roles
router.post("/role", roleController.createRole);
router.get("/roles", roleController.getAllRoles);
router.get("/availableroles", roleController.getAllAvaliableRoles);
router.get("/role/:id", roleController.getRole);
router.put("/updaterole/:id", roleController.updateRole);
router.put("/deleterole/:id", roleController.deleteRole);
router.put("/activaterole/:id", roleController.activateRole);


//Skills
router.post("/skill", skillController.createSkill);
router.get("/skills", skillController.getAllSkills);
router.get("/availableskills", skillController.getAllAvaliableSkills);
router.get("/skill/:id", skillController.getSkill);
router.get("/skillbycourse/:course", skillController.getskillsByCourse);
router.put("/updateskill/:id", skillController.updateSkill);
router.put("/deleteskill/:id", skillController.deleteSkill);
router.put("/activateskill/:id", skillController.activateSkill);

//courses, users
router.get("/courses", coursesController.getAllCourse);
router.get("/course/:id", coursesController.getCourse);
router.get("/coursebyskill/:skillName", coursesController.getCoursesBySkill);
router.put("/deactivecourse/:id", coursesController.deactiateCourse);
router.put("/activatecourse/:id", coursesController.activateCourse);
router.get("/users", coursesController.getAllUser);
router.get("/user/:id", coursesController.getUser);
router.get("/userByEmail/:email", coursesController.getUserByEmail);
router.get("/userByDept/:dept", coursesController.getUserByDept);
//router.get("/learningjourney/:id", coursesController.learningJourneyByID);
router.get("/lj", coursesController.insertLJToDatabase);

//assign skill to course
router.post("/assignskilltocourse", skillCourseController.assignSkillToCourse)
router.delete("/deleteskillfromcourse", skillCourseController.deleteSkillFromCourse)

//LearningJourney 
router.get("/getlearningjourneyby/:id", LjController.GetLjbyStaffID)
router.post("/learningjourney", LjController.createLJ)
router.delete("/learningjourney/:id", LjController.deleteLj)
router.post("/learningjourneycourse",LjController.addCourseToLJ)
router.put("/learningjourneycourse",LjController.updateCourseFromLJ)
router.get("/learningjourneyinfo/:id",LjController.getInfoAboutLJ)


//manager
router.get("/coursecompletedbystaff/:id",managerController.coursesCompletedByTeam)

//registration
router.put("/registerecourse/:id",registerController.updateRegistration)
module.exports = router