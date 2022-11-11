var request = require('supertest')
var app = require('../Backend/server')

describe("Get all skill", function(){
    it("Return all skills in Database", function(done){
        request(app).get("/skills")
        .expect(200,done)
    })
});
describe("Get skill with ID 1", function(){
    it("Return a skill with skillID = 1", function(done){
        request(app).get("/skill/1")
        .expect(200)
        .expect({
            "skillID": 1,
            "skillName": "skill5",
            "skillDetail": "No description",
            "status": 1,
            "roleData": []
        },done)
    })
});
describe("Get all available Skill", function(){
    it("Return all skills with status as 1", function(done){
        request(app).get("/availableskills")
        .expect(200,done)
    })
});
describe("Create a skill", function(){
    it("Create a skill with Valid data", function(done){
        request(app).post("/skill")
        .send(
            {
                "skillName" : "Unit test skill",
                "skillDetail" : ""
            }
        )
        .expect(200,done)
    })
});
describe("Deactive a skill with skillID 1", function(){
    it("Set the skill status to inactive", function(done){
        request(app).put("/deleteskill/skill5")
        .expect(200,done)
    })
});
describe("Activate a skill with skillID 1", function(){
    it("Set the skill status to active", function(done){
        request(app).put("/activateskill/skill5")
        .expect(200,done)
    })
});
describe("Get Skill by CourseID = COR001 ", function(){
    it("Return all the skill that course offer", function(done){
        request(app).get("/skillbycourse/COR001")
        .expect(200,done)
    })
});