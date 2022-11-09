var request = require('supertest')
var app = require('../Backend/server')

describe("Get all role", function(){
    it("Return all roles in Database", function(done){
        request(app).get("/roles")
        .expect(200,done)
    })
});
describe("Get role with ID 1", function(){
    it("Return a role with RoleID = 1", function(done){
        request(app).get("/role/1")
        .expect(200)
        .expect({
            "roleID": 1,
            "roleName": "RoleHAHAHA",
            "roleDetail": "undefined",
            "status": 1,
            "skillData": [
                {
                    "skillID": 1,
                    "skillName": "skill5",
                    "skillDetail": "No description"
                },
                {
                    "skillID": 2,
                    "skillName": "skill2",
                    "skillDetail": "This is skill 2"
                },
                {
                    "skillID": 3,
                    "skillName": "skill3",
                    "skillDetail": "This is skill 3"
                },
                {
                    "skillID": 4,
                    "skillName": "skill4",
                    "skillDetail": "This is skill 4"
                }
            ]
        },done)
    })
});
describe("Get all available Role", function(){
    it("Return all roles with status as 1", function(done){
        request(app).get("/availableroles")
        .expect(200,done)
    })
});
describe("Create a role", function(){
    it("Create a role with Valid data", function(done){
        request(app).post("/role")
        .send(
            {
                "roleName" : "Role From Testing",
                "roleDetail" : "Testing added Role",
                "skillName" : ["SkillTEstttt"]
            }
        )
        .expect(200,done)
    })
});
describe("Update a role", function(){
    it("Create a role with Valid data", function(done){
        request(app).put("/updaterole/1")
        .send(
            {
                "roleName" : "Role From Testing",
                "roleDetail" : "Testing added Role",
                "skillName" : ["SkillTEstttt"]
            }
        )
        .expect(200,done)
    })
});
describe("Deactive a role with RoleID 1", function(){
    it("Set the role status to inactive", function(done){
        request(app).put("/deleterole/1")
        .expect(200,done)
    })
});
describe("Activate a role with RoleID 1", function(){
    it("Set the role status to active", function(done){
        request(app).put("/activaterole/1")
        .expect(200,done)
    })
});
// describe("Deactive a role with invalid roleID", function(){
//     it("Set the role status to inactive", function(done){
//         request(app).put("/deleterole/InvalidID")
//         .expect({
//             status : 400,
//             result : "Fail to soft delete role: " + "InvalidID"
//         })
//         .expect(400,done)
//     })
// });
// describe("Activate a role with invalid roleID", function(){
//     it("Set the role status to active", function(done){
//         request(app).put("/activaterole/InvalidID")
//         .expect({
//             status : 400,
//             result : "Fail to activate role: " + "InvalidID"
//         })
//         .expect(400,done)
//     })
// });