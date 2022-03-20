const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const Event = require("../models/event");
const EventUserJuction = require("../models/eventUserJunction");
const User = require("../models/user");

const router = express.Router();

router.get("/auth/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.patch("/updateprofile", isUserAuthenticated, async(req,res) =>{
  if(req.user.email === req.body.email){
    if(req.body.username!==""){
      req.body.isRegistered=true;
    }
    // make a username validator
    if(req.user.isRegistered){
      req.body.isRegistered = true
    }
    console.log("Updating Profile", req.body);
    const response = await User.update(req.body, {
      where: {
        email: req.user.email,
      }
    }).catch(() => console.log("Error updating User", err))
    if(response){
      res.status(200).json({"message": "Record Updated"})
    }
    else{
      res.status(500).json({"message": "Could not Update"})
    }
  }
  else{
    res.status(401).send("Unauthorized");
  }
} )


router.get("/getuser/:username", async (req,res) => {
  const response = await User.findOne({
    where:{
      username: req.params.username
    }
  }).catch(err => console.log("Error getting user info", err))
  console.log("Got the user/ or not", response);
  if(response){
    res.status(200).json(response)
  }
  if(response===null){
    res.status(200).json({"message": "user not exist"});
  }
})

router.get("/getorganiser/:username", async(req,res) => {
  const response = await User.findOne({
    where:{
      username: req.params.username
    }
  }).catch(err => console.log("Error getting organiser info", err))
  if(response){
    res.status(200).json(response)
  }
  if(response===null){
    res.status(200).json({"message": "user not exist"});
  }
})


router.get("/userwithevents/:username", async (req,res) => {
  const response = await User.findOne({
    where:{
      username: req.params.username
    },
    include: Event
  }).catch(err => console.log("Error getting user info", err))
  console.log("Got the user or not", response);
  if(response){
    res.status(200).json(response)
  }
  if(response===null){
    res.status(200).json({"message": "user not exist"});
  }
})

router.get("/checkusername/:username", async(req,res) => {
  const response = await User.findOne({
    where:{
      username: req.params.username
    }
  }).catch((err) => console.log("Error getting user", err))

  if(response){
    res.status(200).json({"message":"User has Registered"})
  }
  else{
    res.status(200).json({"message":"Username is free"})
  }
})

router.get("/check/user/event/reg/:username/:eventCode",async(req,res) => {
 
  const getEventUserReg = await User.findOne({
    where:{
      username:req.params.username,
    },
    include:[
      {
        model:Event,
        required:true,
        where:{
          eventCode:req.params.eventCode
        }
      }
    ]
  }).catch(console.log("Error getting event user junction"))

  if(getEventUserReg){
    res.status(200).json({"message":"User already registered for this event"})
  }
  else{
    res.status(200).json({"message":"User has not registered for this event"})
  }
})

module.exports = router;
