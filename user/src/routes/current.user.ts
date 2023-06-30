import express from "express";
import { currentUser } from "@prnv404/todo"
import { User } from "../models/user";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, async (req, res) => {

  const user = await User.findById(req.currentUser?.id)

  res.send(user)

});

export { router as currentUserRouter };
