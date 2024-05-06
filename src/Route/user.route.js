import express from "express";
import { userLogin, userSignup } from "../Controllers/user.controller.js";
import verifyToken from "../Middlewares/Auth.midleware.js";

const router = express.Router();

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

router.get("/profile", verifyToken, (req, res) => {
  res.json(req.user);
});

export default router;
