const UserData = require("../Models/UserData");

exports.login = async (req, res) => {
    try {
        const {Email ,Password} = req.body;
        console.log(req.body);

        const payload = {
            email : Email,
            password :Password,
        };

        //Check whether email already exists in db
        const verify = await UserData.findOne({email :Email});
        console.log(verify);

        if(!verify) {
            return res.status(400).send({
                message : "User not registered. Please signup"
            });
        }

        if(verify.password !== Password) {
            return res.status(400).send({
                message : "Wrong password. Try again"
            })
        }


        res.status(200).send({
            message : "Login successful",
            user : verify
        })
    }
    catch (err) {
        res.status(500).send(err);
    }
}

exports.signup = async (req, res) => {
    try {
        //Get user's data from req body to make User Object
        const {Name , Email ,Password} = req.body;
        console.log(req.body)
        const user = new UserData({
            name : Name,
            email : Email,
            password : Password
        });

        //Check whether email already exists in db
        const verify = await UserData.find({email :Email});
        console.log(verify);

        let result, verifiedUser;
        if(verify.length > 0) {
            //User already exists
            result = false;                     
        }
        else {
            //User does not exist so add in db
            verifiedUser = await user.save();
            result = true;
        }
        if(result) {
            res.status(200).send({
                message : "User data added. Signup successful",
                user : verifiedUser
            });
        }
        else {
            res.status(400).send({
                message : "User already exists. Signup failed"
            })
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}