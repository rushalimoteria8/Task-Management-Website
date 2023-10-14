//cd "C:\Program Files\MongoDB\Server\6.0\bin"
//then: mongod --dbpath=\Users\rusha\mongodb-data

const express = require("express");
const mongoose = require("mongoose");
const NewTask = require("./models/newTask.model");
const NewUser = require("./models/newUser.model");
const router = express.Router();
const cors = require("cors");
const auth = require('./middleware/Auth')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//connecting to database
mongoose
  .connect("mongodb://127.0.0.1:27017/sample-data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection failed", error);
    return;
  });

//defining routes 
router.route("/user/signup").post(async (req, res) => {
    const {username, email, password} = req.body;

    const credentials = {username, email, password};

    const emailCheck = await NewUser.findOne({email:email.trim()});

    if(emailCheck){
      console.log('dup email');
      return res.json({ 
        status : false,
        message: "Email-id has already been used." });
    }

    if (username.length > 25) {
      return res.status(400).send({status : false, message: "Name less than 25 characters" })
    }
    if (password.length < 8) {
      return res.status(400).send({ status : false,message: "Password less than 6 characters" })
    }
    try{
      const user = new NewUser(credentials);
      const data = await user.save(); 

      if(!data){
        res.status(401).json({
          status : false,
          message: "Error creating user"
        });
      }
      else{
        const token = await user.generateAuthToken();
        res.status(200).send({
          message: "User successfully created",
          user,
          token
        });
      }
    }catch(error){
      res.status(401).json({
        message: "User not created",
        error: error.message
      });
    }
});


router.route('/user/login').post(async (req,res)=>{

  try{
    const user = await NewUser.findByCredentials(req.body.email,req.body.password);
    //calling the method on the specific user only
    const token = await user.generateAuthToken();

    res.status(200).send({status:true, user, token});
    console.log('token created')

  }catch(error){
    //if any error thrown by the findByCredentials then it will be caught here, else user will be returned
    res.status(401).send({
      status:false,
      message: error.message
    });
  }

});

router.route('/user/id').get(auth, async(req,res)=>{
  res.send({username:req.user.username});
});

router.route('/user/profile').get(auth, async(req,res)=>{
  res.send({user:req.user});
});

router.route('/user/update').patch(auth, async(req,res)=>{
  const updates = Object.keys(req.body);
  try{
    updates.forEach((update)=>{
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);

  }catch(error){
    console.log(error);
    res.status(400).send(error)
  }

});


router.route("/addTask").post(auth, async (req, res) => {
  //const task = new NewTask(req.body);
  //console.log(req.userData);
  const task = new NewTask({
    ...req.body,
    owner: req.user._id
  })
  await task
    .save()
    .then(() => {
      console.log('task created');
      res.status(201).send("task created");
    })
    .catch((error) => {
      console.log('error creating task');
      console.log(error);
      res.send(error);
    });
});

router.route("/tasks").get(auth,async (req, res) => {
  try{
    await req.user.populate('usertasks');
    res.send(req.user.usertasks)
  }catch(e){
    console.log(e);
    res.status(500).send({status:false, message:'Error fetching tasks'})
  }
  //or
  /*NewTask.find({onwer:req.user._id})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(500).send({status:false, message:'Error fetching tasks'});
    });*/
});

router.route("/completed").put(async (req, res) => {
  taskId = req.query.id;

  try {
    const updatedDoc = await NewTask.findByIdAndUpdate(
      taskId,
      { completed: "yes" },
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return res.status(404).send("No task found");
    }
    res.send(updatedDoc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/tasks/delete").delete(async (req, res) => {
  const taskID = req.query.id;

  try {
    const response = await NewTask.findByIdAndDelete(taskID);

    if (!response) {
      return res.status(404).send("No task found");
    }

    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/tasks/task").get(async (req, res) => {
  try {
    const taskId = req.query.taskid;

    const task = await NewTask.findOne({ _id: taskId });

    if (!task) {
      return res.status(400).json({ error: "task not found" });
    }
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

router.route("/tasks/task/edit").put(async (req, res) => {
  const taskId = req.query.id;
  const updateData = req.body;

  try {
    const updatedDoc = await NewTask.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return res.status(404).send("No task found");
    }
    console.log("updated");
    res.send(updatedDoc);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
