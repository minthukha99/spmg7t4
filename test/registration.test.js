var request = require('supertest')
var app = require('../Backend/server')

describe("Register a user for a course", function(){
    it("Register a user for a course", function(done){
        request(app).put("/registerecourse/1")
        .expect(200,done)
    })
});