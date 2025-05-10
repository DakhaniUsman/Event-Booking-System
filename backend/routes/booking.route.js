import { Router } from "express";
import { BookSeat } from "../controllers/booking.controllers.js";

const BookingRoutes = Router();

BookingRoutes.post("/bookings", BookSeat);

export default BookingRoutes;