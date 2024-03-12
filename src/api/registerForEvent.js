const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const User = require("../models/user");
const Event = require("../models/event");
const Input = require("../models/input");
const EventUserJuction = require("../models/eventUserJunction");
const {Novu} = require("@novu/node")

const novu = new Novu(process.env.NOVU_API_KEY);

const router = express.Router();

router.post("/registeruser/:eventCode" , async (req,res) =>{
    const event = await Event.findOne({
        where:{
            eventCode: req.params.eventCode
        },
        include: Input
    }).catch((err) => console.log("Error getting event while registering user"))

    // if(event){
    //     if(event.Inputs.find(ele => ele.inputVar === 'whatsappNumber') && req.body.whatsappNumber==="" && req.user.whatsappNumber==="" ){
    //         res.status(404).json({"message":"whatsapp Number required"})
    //         return
    //     }

    //     if(event.Inputs.find(ele => ele.inputVar === 'githubUsername') && req.body.githubUsername==="" && req.user.githubUsername==="" ){
    //         res.status(404).json({"message":"Github Username required"})
    //         return
    //     }
    //     // complete other inputs
    // }

    const updateObject = {}

    event.Inputs.map(element => {
        inputVar = element.inputVar
        if(!req.body[inputVar] || req.body[inputVar]===''){
            res.status(400).json({"message": "Some error occured"})
        }
        updateObject[inputVar] = req.body[inputVar]
    })

    // if(event.Inputs.find(ele => ele.inputVar === 'githubUsername') && req.user.githubUsername===""){
    //     updateObject.githubUsername = req.body.githubUsername;
    // }
    // if(event.Inputs.find(ele => ele.inputVar === 'whatsappNumber') && req.user.whatsappNumber===""){
    //     updateObject.whatsappNumber = req.body.whatsappNumber;
    // }
    if(!req.user||!req.user.email){
        res.status(401).json({"message":"User not authenticated"})
    }

    const response = await User.update({eventInputs:updateObject}, {
        where: {
          email: req.user.email,
        }
      }).catch(() => console.log("Error updating User", err))
      if(response){

        const getUser = await User.findOne({
            where:{
                username:req.user.username
            }
        }).catch(err=>console.log("Error getting user",err))
        
        await event.addUser(getUser).catch((err) => console.log("Error Registering user for event", err));
        
        console.log(getUser.id)
        const topicKey = event.get('eventCode')
        const novuResponse = await novu.topics.addSubscribers(topicKey, {
            subscribers: [getUser.id.toString()],
          }).catch((err) => console.log("Error while addinf subscriber to topic", err?.response?.data));
        console.log(novuResponse);

        res.status(200).json({"message":"User registered for event"})
      }
      else{
        res.status(500).json({"message": "Could not Update User record"})
      }
})

router.post("/directregister/:eventCode", async (req,res) => {
    const event = await Event.findOne({
        where:{
            eventCode: req.params.eventCode
        },
        include: Input
    }).catch((err) => console.log("Error getting event while registering user"))

    if(event){
        if(event.Inputs.find(ele => ele.inputVar = 'whatsappNumber') && !req.user.whatsappNumber){
            res.status(404).json({"message":"whatsapp Number required"})
            return;
        }
        // complete other inputs
    }

    const getUser = await User.findOne({
        where:{
            username:req.user.username
        }
    }).catch(err=>console.log("Error getting user",err))

    const topicKey = event.get('eventCode')
    const novuResponse = await novu.topics.addSubscribers(topicKey, {
        subscribers: [getUser.id.toString()],
        }).catch((err) => console.log("Error while addinf subscriber to topic", err?.response?.data));
    console.log(novuResponse);
    await event.addUser(getUser).catch((err) => console.log("Error Registering user for event", err));
    res.status(200).json({"message":"User registered for event"})


} )

router.post("/registerteam/:eventCode", async(req,res) => {
    console.log("Getting Info", req.body);
    const chosenTeamsize = req.body.chosenTeamsize;
    const event = await Event.findOne({
        where:{
            eventCode: req.params.eventCode
        },
        include: Input
    }).catch((err) => console.log("Error getting event while registering user"))

    if(event){
        if(event.Inputs.find(ele => ele.inputVar === 'whatsappNumber') && req.body.whatsappNumber==="" && req.user.whatsappNumber===""){
            res.status(404).json({"message":"whatsapp Number required"})
            return
        }

        if(event.Inputs.find(ele => ele.inputVar === 'githubUsername') && req.body.githubUsername==="" && req.user.githubUsername===""){
            res.status(404).json({"message":"Github Username required"})
            return
        }
        // complete other inputs
    }

    const updateObject = {}

    if(event.Inputs.find(ele => ele.inputVar === 'githubUsername') && req.user.githubUsername===""){
        updateObject.githubUsername = req.body.githubUsername;
    }
    if(event.Inputs.find(ele => ele.inputVar === 'whatsappNumber') && req.user.whatsappNumber===""){
        updateObject.whatsappNumber = req.body.whatsappNumber;
    }


    if(Object.keys(updateObject).length !== 0){
        const response = await User.update(updateObject, {
            where: {
              email: req.user.email,
            }
          }).catch((err) => console.log("Error updating User", err))
    }

    const getUserEventJunc = await EventUserJuction.findOne({
        where:{
            teamName: req.body.teamName,
            EventId: event.id
        }
    }).catch(err => console.log("Error getting team name",err))
    // console.log(getUserEventJunc);
    if(getUserEventJunc && Object.keys(getUserEventJunc).length !== 0){
        res.json({"message":"Team Name already exist"})
        return;
    }

    const getTeamLead = await User.findOne({
        where:{
            email: req.user.email
        }
    }).catch((err)=> console.log("Error getting user", err))

    await event.addUser(getTeamLead, {through: { teamName: req.body.teamName }}).catch(err => console.log("Error registering user", err))
    
    if(chosenTeamsize > 1 && req.body.username1){
        const part1 = await User.findOne({
            where:{
                username: req.body.username1
            }
        }).catch((err)=> console.log("Error getting user", err))
    
        await event.addUser(part1, {through: { teamName: req.body.teamName }}).catch(err => console.log("Error registering user", err))
    }

    if(chosenTeamsize > 2 && req.body.username2){
        const part2 = await User.findOne({
            where:{
                username: req.body.username2
            }
        }).catch((err)=> console.log("Error getting user", err))
    
        await event.addUser(part2, {through: { teamName: req.body.teamName }}).catch(err => console.log("Error registering user", err))
    }

    if(chosenTeamsize > 3 && req.body.username3){
        const part3 = await User.findOne({
            where:{
                username: req.body.username3
            }
        }).catch((err)=> console.log("Error getting user", err))
    
        await event.addUser(part3, {through: { teamName: req.body.teamName }}).catch(err => console.log("Error registering user", err))
    }

    res.status(200).json({"message":"Team Registered"})

})



module.exports = router;