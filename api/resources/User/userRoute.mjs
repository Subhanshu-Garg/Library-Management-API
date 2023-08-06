import express from "express";
import { changeRole, myProfile, signIn, signOut, signUp } from "./userController.mjs";
import {  isUserLibrarian } from "../../helpers/middleware.mjs";
import passport from "passport";

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route("/signout").get(signOut);

router.route("/myprofile").get(passport.authenticate('jwt', { session: false }), myProfile);

router.route("/changerole").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, changeRole);

export default router;