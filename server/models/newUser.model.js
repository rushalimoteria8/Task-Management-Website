const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretString = require('./secretString');

const Schema = mongoose.Schema;

const newuserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true
        },

        email:{
            type:String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },

        password:{
            type: String,
            required: true,
            minlength: 8,
            trim: true,
        },

        tokens:[{
            token:{
                type:String,
                required:true
            }
        }
        ]
    }
);

//this function will be executed whenever user is send to client using .send()
//whenever we write res.send(user): internally json.stringify is executed and during this exec
//we control what object we want to send to the client
//this function deleted imp user data like password and tokens
newuserSchema.methods.toJSON = function(){
    const user = this;
    const modifiedUserObject = user.toObject();

    delete modifiedUserObject.password;
    delete modifiedUserObject.tokens;

    return modifiedUserObject;

}

//creating an instance method that applies to only a specific instance
newuserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'mysecretstring');
    user.tokens = user.tokens.concat({token});
    user.save();
    return token;
}

//creating a function for the user schema (model method)
newuserSchema.statics.findByCredentials = async (email, password) => {

    const user = await NewUser.findOne({email});

    if(!user){
        throw new Error('Incorrect email or password');
    }

    const passMatch = await bcrypt.compare(password, user.password)

    if(!passMatch){
        throw new Error('Incorrect email or password');
    }

    //user is returned if the user is found and now errors are thrown
    return user;
};

//creating middleware function
//hasing the password before the users are saved (before new user created or existing modified)
newuserSchema.pre('save', async function(next){
    //this points to the doc we want to create
    const user = this;
    
    //we check if the password is being modified
    //isModified('password'): will be true when the user is created or password in updated
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//creating a virtual property on the user to associate each user with his/her tasks
newuserSchema.virtual('usertasks',{
    ref: 'Task',
    localField:'_id',
    foreignField:'owner'
})

const NewUser = mongoose.model('User', newuserSchema);

module.exports = NewUser;