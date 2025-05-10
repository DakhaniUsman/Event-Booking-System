import { Event } from "../models/event.schema.js";
import { User } from "../models/user.schema.js";

export const AllEvents = async (req, res) => {
  try {
    const response = await Event.find();

    if (!response) {
      return res.json({
        success: false,
        message: "Error while fetching all events.",
      });
    }

    console.log(response, "response");

    return res.json({
      success: true,
      message: "All events fethced successfully",
      eventData: { response },
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateEvent = async (req, res) => {
  const { createdBy } = req.body;
  if (!createdBy) {
    return res.json({ success: false, message: "User Id Not found" });
  }

  const isUserExist = await User.findById(createdBy);
  if (!isUserExist) {
    return res.json({ success: false, message: "User  Not found" });
  }

  if (isUserExist?.role !== "admin"){
    return res.json ({ success : false , message : "You are not admin"})
  }

  try {
    const {
      title,
      description,
      date,
      time,
      location,
      totalSeats,
      bookedSeats,
      createdBy,
    } = req.body;

    console.log(
      title,
      description,
      date,
      time,
      location,
      totalSeats,
      bookedSeats,
      createdBy,
      " title , description , date, time, location, totalSeats , bookedSeats, createdBy"
    );

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !totalSeats ||
      !bookedSeats ||
      !createdBy
    ) {
      return res.json({ success: false, message: "All fields are requried" });
    }

    const isEventExits = await Event.findOne({ title: title });

    if (isEventExits) {
      return res.json({ success: false, message: "Event already exist" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      totalSeats,
      bookedSeats,
      createdBy,
    });
    console.log(newEvent, "newEvent");

    await newEvent.save();

    return res.json({ success: true, message: "Event Added!" });
  } catch (error) {
    console.log(error);
  }
};
export const SingleEvent = async (req, res) => {
      const { createdBy } = req.body;
  if (!createdBy) {
    return res.json({ success: false, message: "User Id Not found" });
  }

  const isUserExist = await User.findById(createdBy);
  if (!isUserExist) {
    return res.json({ success: false, message: "User  Not found" });
  }

  if (isUserExist?.role !== "admin"){
    return res.json ({ success : false , message : "You are not admin"})
  }

  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, message: "Event id not found" });
  }

  try {
    const singleEvent = await Event.findById(id);

    if (!singleEvent) {
      return res.json({
        success: false,
        message: "Error while fetching all events.",
      });
    }

    console.log(singleEvent, "singleEvent");

    return res.json({ success: true, message: "Events fethced successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const UpdateEvent = async (req, res) => {

       const { createdBy } = req.body;
  if (!createdBy) {
    return res.json({ success: false, message: "User Id Not found" });
  }

  const isUserExist = await User.findById(createdBy);
  if (!isUserExist) {
    return res.json({ success: false, message: "User  Not found" });
  }

  if (isUserExist?.role !== "admin"){
    return res.json ({ success : false , message : "You are not admin"})
  }

  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, message: "Event id not found" });
  }

  try {
    const updateEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateEvent) {
      return res.json({
        success: false,
        message: "Error while fetching all events.",
      });
    }

    console.log(updateEvent, "updateEvent");
    await updateEvent.save();

    return res.json({
      success: true,
      message: "Events data updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const DeleteEvent = async (req, res) => {

      const { createdBy } = req.body;
  if (!createdBy) {
    return res.json({ success: false, message: "User Id Not found" });
  }

  const isUserExist = await User.findById(createdBy);
  if (!isUserExist) {
    return res.json({ success: false, message: "User  Not found" });
  }

  if (isUserExist?.role !== "admin"){
    return res.json ({ success : false , message : "You are not admin"})
  }

  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, message: "Event id not found" });
  }

  try {
    const deleteEvent = await Event.findByIdAndDelete(id, req.body, {new:true});

    if (!deleteEvent) {
      return res.json({
        success: false,
        message: "Error while deleting events.",
      });
    }

    console.log(deleteEvent, "deleteEvent");

    return res.json({
      success: true,
      message: "Events deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
