import express  from "express";
import { check_register, register } from "../controllers/user_controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/check_register", check_register)




export default router;