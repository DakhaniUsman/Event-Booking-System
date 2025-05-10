import { Router } from "express";
import {
  AllEvents,
  CreateEvent,
  SingleEvent,
  UpdateEvent,
  DeleteEvent,
} from "../controllers/event.controllers.js";

const EventRoutes = Router();

EventRoutes.get("/events", AllEvents);
EventRoutes.post("/create-event", CreateEvent);
EventRoutes.get("/single-event/:id", SingleEvent);
EventRoutes.put("/update-event/:id", UpdateEvent);
EventRoutes.delete("/delete-event/:id", DeleteEvent);

export default EventRoutes;
