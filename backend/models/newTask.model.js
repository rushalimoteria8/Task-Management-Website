const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newtaskSchema = new Schema({
    taskTitle:{
        type: String,
        required: true,
        maxlength:20
    },
    taskDesc:{
        type: String,
        default: ''
    },
    deadline:{
        type:Date,
        required: true,
        /*validate: {validator: function (value){
            return value>=Date.now();
        },
            message:'Date must be greater or equal to current date'
        }*/
    },
    startDate:{
        type: Date,
        required: true, 
    },
    startTime:{
        type: String,
        required: true
    },
    days:{
        type: Number,
        default: 0,
    },
    hours:{
        type: Number,
        default: 0,
        min:0,
        max:24
    },
    minutes:{
        type: Number,
        default: 0,
        min:0,
        max:60
    }

});

const subtaskSchema = new Schema({
    id: {
        type: String,
        //unique: true
    },

    SubTaskTitle:{
        type: String,
        required: true,
        maxlength:30
    },

    SubTaskStartDate:{
        type: Date,
        required: true,  
    },

    SubTaskStartTime:{
        type: String,
        required: true
    },

    SubTaskDays:{
        type: Number,
        default:0
    },
    SubTaskHours:{
        type: Number,
        default:0,
        min:0,
        max:24
    },
    SubTaskMinutes:{
        type: Number,
        default:0,
        min:0,
        max:60
    },
});

const settingSchema = new Schema({
    priority:{
        type:Number,
        required: true
    },
    reminder:{
       type: String,
       default: "no"     
    },
    reward:{
        type: String,
        default: "No rewards set"
    }
})



const taskSchema = new Schema({
    newTask: newtaskSchema,

    subTasks: {
        type:Map,
        of: subtaskSchema
    },
    tasksettings: settingSchema,

    completed: {
        type: String,
        defualt: "no"
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const NewTask = mongoose.model('Task', taskSchema);

module.exports = NewTask;
