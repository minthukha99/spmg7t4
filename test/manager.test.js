var request = require('supertest')
var app = require('../Backend/server')

describe("Course completed by Team", function(){
    it("Return courses completed by a staff", function(done){
        request(app).get("/coursecompletedbystaff/140001")
        .expect(200,done)
    })
});