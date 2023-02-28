import { Router } from "express";
import { signupPost, postVerifyOtp, loginPost,resendOtp } from "../controller/authController.js";
const router = Router();


router.post('/signup', signupPost);
router.post('/verify', postVerifyOtp);
router.post('/login', loginPost);
router.get('/resend-otp',resendOtp)


export default router;