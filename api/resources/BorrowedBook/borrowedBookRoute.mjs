import express from "express";
import passport from "passport";
import { isUserLibrarian } from "../../helpers/middleware.mjs";
import { allIssuedBooks, issueBook, overDueBooks, returnBook } from "./borrowedBookController.mjs";

const router = express.Router();

router.route("/issue").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, issueBook);
router.route("/return").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, returnBook);
router.route("/issuedbooks").get(passport.authenticate('jwt', { session: false }), isUserLibrarian, allIssuedBooks);
router.route("/overduebooks").get(passport.authenticate('jwt', { session: false }), isUserLibrarian, overDueBooks);
export default router;