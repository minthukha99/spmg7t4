var request = require('supertest')
var app = require('../Backend/server')

describe("Get All course", function(){
    it("Return all the course", function(done){
        request(app).get("/courses")
        .expect(200,done)
    })
});
describe("Get Course with Course_ID = COR001", function(){
    it("Return a course with ID = COR001", function(done){
        request(app).get("/course/COR001")
        .expect(200,done)
    })
});
describe("Get Active courses", function(){
    it("Return courses with status as active", function(done){
        request(app).get("/activecourse")
        .expect(200,done)
    })
});
describe("Get Courses by skill", function(){
    it("Return All courses with a given Skill", function(done){
        request(app).get("/coursebyskill/Skill1")
        .expect(200,done)
    })
});
describe("Deactive a course", function(){
    it("Set a course status to retire", function(done){
        request(app).put("/deactivecourse/COR001")
        .expect(200,done)
    })
});
describe("Activate a course", function(){
    it("Set a course status to Active", function(done){
        request(app).put("/activatecourse/COR001")
        .expect(200,done)
    })
});
describe("Get all Users", function(){
    it("Return all Users", function(done){
        request(app).get("/users")
        .expect(200,done)
    })
});
describe("Get a User with staff_ID = 140002", function(){
    it("Return all Users", function(done){
        request(app).get("/user/140002")
        .expect(200,done)
    })
});
describe("Get a User by department", function(){
    it("Return all Users", function(done){
        request(app).get("/userByDept/Sales")
        .expect(200,done)
    })
});
