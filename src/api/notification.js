const express = require("express");

const novu = require("../notifications/notification")
const {isUserOrganiser} = require("../middlewares/auth")
const router = express.Router();
const EventUpdate = require("../models/eventUpdate")
const Event = require("../models/event")

router.get("/get-updates/:eventCode", async(req,res) => {
  if(req.params.eventCode === undefined){
    res.status(400).json({"messasge":"invalid Event Code"})
    return
  }

  const event = await Event.findOne({where: {eventCode : req.params.eventCode}, include:EventUpdate}).catch(err=> {console.log(err)})
  console.log(event);
  if(!event){
    res.status(500).json({"message":"Some error occured"})
    return
  }
  res.status(200).json({eventUpdates : event.EventUpdates})
  return
})

router.post("/add-event-notification/:eventCode", isUserOrganiser, async(req,res) => {

  message = req.body.message

  const event = await Event.findOne({where: {eventCode : req.params.eventCode}}).catch(err=> {console.log(err)})
  
  const eventUpdate = await EventUpdate.create({message})
  console.log(eventUpdate);
  await event.addEventUpdate(eventUpdate)
  // await eventUpdate.addEvent(event)

  const topicKey =req.params.eventCode
  const notificationTemplateId = 'default-workflow'
  await novu.trigger(notificationTemplateId, {
    to: [{ type: 'Topic', topicKey: topicKey }],
    payload: {
      eventName:event.eventName,
      message:message
    },
  }).catch((err) => {
    console.log("Error triggering notification: ", err?.response?.data)
    res.status(501).json({"message":"Error in triggereing notification"})
});

  res.status(200).json({"message":"User registered for event"})
})

module.exports = router;