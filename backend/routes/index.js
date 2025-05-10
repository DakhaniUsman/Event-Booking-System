import { Router } from "express";
import AuthRoutes from "./auth.route.js";
import EventRoutes from "./event.route.js";
import BookingRoutes from "./booking.route.js";

const AllRoutes = Router();

AllRoutes.use("/auth", AuthRoutes);
AllRoutes.use("/events", EventRoutes );
AllRoutes.use("/bookings", BookingRoutes );


export default AllRoutes;