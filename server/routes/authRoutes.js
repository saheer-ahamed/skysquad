import { Router } from "express";
import { signupPost, postVerifyOtp } from "../controller/authController.js";
const router = Router();


router.post('/create', signupPost)
router.post('/verify',postVerifyOtp)


export default router;