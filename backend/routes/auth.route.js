import { Router } from "express";
import { Register, Login, Profile } from "../controllers/auth.controller.js";

const AuthRoutes = Router();

AuthRoutes.post('/register', Register)
AuthRoutes.post('/login', Login)
AuthRoutes.post('/profile', Profile)


export default AuthRoutes;