import express from "express";
import passport from "passport";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "./bookController.mjs";
import { isUserLibrarian } from "../../helpers/middleware.mjs";

const router = express.Router();


//Need middleware to authorized user as librarian.


router.route("/").get(passport.authenticate('jwt', { session: false }), getBooks);

router.route("/add").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, addBook);

router.route("/:isbn/delete").delete(passport.authenticate('jwt', { session: false }), isUserLibrarian, deleteBook);

router.route("/:isbn/update").patch(passport.authenticate('jwt', { session: false }), isUserLibrarian, updateBook);

router.route("/:isbn").get(passport.authenticate('jwt', { session: false }), getBook);
export default router;