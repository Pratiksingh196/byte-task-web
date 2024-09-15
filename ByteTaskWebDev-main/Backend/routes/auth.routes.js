import { Router } from "express";
import { callBackFunction, gitAuth, loginFailed, loginSuccess, logoutGitHub, subScriptionValidation } from "../controller/auth.controller.js";

const router = Router();


router.get('/',gitAuth)

router.get('/github/callback',callBackFunction)

router.get('/login/success',loginSuccess)

router.get('/login/failed',loginFailed)

router.get('/subscription/follow' , subScriptionValidation)

router.get('/logout' , logoutGitHub)


export default router;