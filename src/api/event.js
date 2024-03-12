const express = require("express");
const User = require("../models/user");
const Event = require("../models/event");
const Input = require("../models/input");
const { isUserAuthenticated, isUserAdmin, isUserOrganiser } = require("../middlewares/auth");
const EventInputJuction = require("../models/eventInputJunction");
const { default: axios } = require("axios");
const EventUserJuction = require("../models/eventUserJunction");
const novu = require("../notifications/notification")

const router = express.Router();

router.post("/addevent", isUserAdmin, async (req,res) => {
    let {eventName, date, organiser1, organiser2, organiser3, rounds, about, prizes,image1URL, image2URL, category ,eventCode, teamSize, mode } = req.body;
    
    if(req.body.organiser2==""){
        organiser2 = null;
    }
    if(req.body.organiser3==""){
        organiser3 = null;
    }
    
    const alreadyExistsEvent = await Event.findOne({ where: { eventName } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
    );

    if (alreadyExistsEvent) {
        return res.status(409).json({ message: "Event with same name Already Exist" });
    }

    const image1 = image1URL;
    const image2 = image2URL;


    const newEvent = new Event({eventName, date, organiser1,organiser2,organiser3, rounds, about, prizes, image1, image2, category, eventCode,teamSize, mode});
    const savedEvent = await newEvent.save().catch((err) => {
        console.log("Error saving event: ",err);
        res.status(500).json({error: "Cannot save event at the moment"});
        return;
    })

    if(organiser1 && organiser1!==""){
        await User.update({isOrganiser:true},{
            where:{
                username:organiser1
            }
        }).catch(err => console.log("Error making user organiser"))
    }
    if(organiser2 && organiser2!==""){
        await User.update({isOrganiser:true},{
            where:{
                username:organiser2
            }
        }).catch(err => console.log("Error making user organiser"))
    }
    if(organiser3 && organiser3!==""){
        await User.update({isOrganiser:true},{
            where:{
                username:organiser3
            }
        }).catch(err => console.log("Error making user organiser"))
    }

    const inputDetails = await Input.findAll().catch(err => console.log("Error getting inputs",err));


    if(inputDetails){

        inputDetails.map(instance => {
            if (req.body.hasOwnProperty(instance.get('inputVar')) && req.body[instance.get('inputVar')]){
                savedEvent.addInput(instance).catch((err) => console.log("Error referencing input to event", err))
            }
            console.log(instance.get('inputVar'));
        })
        
        
        // Create a topic where all the subscribers will get notified

        const result = await novu.topics.create({
            key: eventCode,
            name: eventName,
        }).catch((err) => {console.log("Error occured while adding a topic", err?.response?.data?.message)});
        
        console.log(result);
        
        res.status(200).send("Success")
    }
    else{
        res.status(500).send("Internal Server Error");
        return
    }
});

router.get("/getevents", async (req,res) => {
    console.log("Getting Events....");
    const allEvents = await Event.findAll({include:Input}).catch((err)=>{
        console.log("Server Error, Cannot get Events");
        res.status(500).json({message:"Cannot get Events"});
        return
    });
    if(allEvents) res.status(200).json({allEvents});
});

router.get("/getevent/:eventCode", async (req,res) =>{
    const event = await Event.findOne({
        where:{
        eventCode: req.params.eventCode,
        },
        include: Input
    }).catch((err) => {
        console.log("error Getting event", err);
    });
    if(event) res.status(200).json({event});
})

router.get("/getparticipants/:eventCode",isUserOrganiser, async(req,res) =>{
    const response = await Event.findOne({
        where:{
            eventCode:req.params.eventCode
        },
        include:User
    }).catch(err => console.log("Error getting participants", err));
    if(response){
        res.status(200).json(response);
    }
})

router.get("/check/teamname/:teamName/:eventId", async(req,res) => {
    const response = await EventUserJuction.findOne({
        where:{
            teamName:req.params.teamName,
            EventId: req.params.eventId
        }
    }).catch(err => console.log("Error getting eventUser details",err));

    if(response){
        res.status(200).json({"message":"Team name already exist"})
        return
    }
    else{
        res.status(200).json({"message":"Team name is free"})
        return
    }
})



module.exports= router;