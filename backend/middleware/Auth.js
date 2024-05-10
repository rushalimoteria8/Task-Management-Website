const jwt = require('jsonwebtoken');
const NewUser = require('../models/newUser.model');

const secretString = require('../models/secretString');

const auth = async (req,res,next) => {
    try{
    const token = req.header('Authorization').replace('Bearer ','');
    //decoded checks whether the token exists, is not expired and has the correct signature
    //it returns the token detials (i.e. the user_id for which the token was created)
    const decoded = jwt.verify(token, 'mysecretstring')
    //finding the user with that id..and also checking where the token is present in the tokens arrayss
    //so finding via both the conditions
    const user = await NewUser.findOne({_id:decoded._id, 'tokens.token':token});

    if(!user){
        console.log('erorr findind user')
        throw new Error();//this will directly lead to the catch block
    }

    //we have already found the user so sending the user as the 'user' property of the request
    //so that other endpoints do not need to find the user
    console.log('user authenticated')
    req.user=user;
    next();
    
    }catch(error){
        res.status(401).send({status:false, message: 'Please authenticate.'})
    }
}

module.exports = auth;