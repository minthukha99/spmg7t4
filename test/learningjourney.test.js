var request = require('supertest')
var app = require('../Backend/server')

describe("Get Learning Journey By Staff_ID", function(){
    it("Return all learning journey for selected staff", function(done){
        request(app).get("/getlearningjourneyby/1000")
        .expect(200,done)
    })
});

// describe("Create a new Learning Journey", function(){
//     it("Return all learning journey for selected staff", function(done){
//         request(app).get("/getlearningjourneyby/1000")
//         .expect(200,done)
//     })
// });
// describe("Delete a Learning Journey with LJID = 1", function(){
//     it("Deletes a LJ from DB", function(done){
//         request(app).delete("/learningjourney/1")
//         .expect(200,done)
//     })
// });

// describe("Update a learning Journey", function(){
//     it("Updates a LJ with new Courses", function(done){
//         request(app).put("/learningjourneycourse")
//         .expect(200,done)
//     })
// });
describe("Get Learning Journey Information ", function(){
    it("Return all info about a learning journey", function(done){
        request(app).get("/learningjourneyinfo/1")
        .expect(200,done)
    })
});
