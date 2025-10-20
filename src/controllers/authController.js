import { Router } from "express";
import userService from "../services/userService.js";

const authController = Router();
authController.get("/register", (req, res) => {
  res.render("auth/register");
});

authController.post("/register", async (req, res) => {
  const userData = req.body;
  if (userData.password === userData.rePassword) {
    await userService.register(userData);
    res.redirect("/");
  } else {
    console.log("wrong passwords");
  }
});

export default authController;
