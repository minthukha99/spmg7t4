var request = require('supertest')
var app = require('../Backend/server')

describe("Assign a Skill To a Course", function(){
    it("Assign a skill to a course", function(done){
        request(app).put("/assignskilltocourse")
        .send(
            {
                "skillName" : "SkillName",
                "course_ID" : "CourseName",
            })
        .expect(200,done)
    })
});
describe("Remove a Skill from a Course", function(){
    it("Remove a skill from a course", function(done){
        request(app).delete("/deleteskillfromcourse")
        .send(
            {
                "skillName" : "SkillName",
                "course_ID" : "CourseName",
            })
        .expect(200,done)
    })
});