const CSVToJSON = require('csvtojson');


const getAllCourse = async (req, res) => {
    CSVToJSON().fromFile('./Backend/RawData/courses.csv')
        .then(courses => {
            // users is a JSON array
            // log the JSON array
            //console.log(users);
            return res.status(200).json(courses);
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });

};
const getCourse = async (req, res) => {
    const id = req.params;
    var found = false;
    await CSVToJSON().fromFile('./Backend/RawData/courses.csv')
        .then(courses => {
            // users is a JSON array
            // log the JSON array
            //console.log(users);
            courses.forEach(course => {
                if (course.Course_ID == id.id) {
                    found = true;
                    return res.status(200).json(course);
                }
            });

        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });
    if (!found){
        return res.status(404).json({
            "Status": 404,
            "Message": "Invalid course ID : " + id.id
        });
    }

};
const getAllUser = async (req, res) => {
    CSVToJSON().fromFile('./Backend/RawData/staff.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            //console.log(users);
            return res.status(200).json(users);
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });

};

const getUser = async (req, res) => {
    const id = req.params;
    var found = false;
    await CSVToJSON().fromFile('./Backend/RawData/staff.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            users.forEach(user => {
                if (user.Staff_ID == id.id) {
                    found = true;
                    return res.status(200).json(user);
                }
            });
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });
    if (!found){
        return res.status(404).json({
            "Status": 404,
            "Message": "Invalid user ID : " + id.id
        });
    }
};
const getUserByEmail = async (req, res) => {
    const email = req.body.Email;
    var found = false;
    var getUser;
    await CSVToJSON().fromFile('./Backend/RawData/staff.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            users.forEach(user => {
                if (user.Email == email) {
                    found = true;
                    getUser = user;
                }
            });
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });
    if (!found){
        return res.status(404).json({
            "Status": 404,
            "Message": "User not found Invalid user Email : " + id.id
        });
    }else{
        return res.status(200).json(getUser);
    }
};
const learningJourneyByID = async (req, res) => {
    const id = req.params.id
    var resultData = [];
    CSVToJSON().fromFile('./Backend/RawData/registration.csv')
        .then(users => {
            // users is a JSON array
            // log the JSON array
            //console.log(users);
            users.forEach(user => {
                if(user.Staff_ID == id){
                    resultData.push(user);
                }
            });
            return res.status(200).json(resultData);
        }).catch(err => {
            // log error if any
            console.log(err);
            return res.status(400).json({
                "Status": 400,
                "Message": err
            });
        });        
};


module.exports = { getAllCourse, getCourse, getAllUser, getUser, getUserByEmail, learningJourneyByID}


