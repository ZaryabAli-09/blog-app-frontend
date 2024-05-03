import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signOut,
  getUsers,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", deleteUser);
router.post("/signout", signOut);
router.get("/getusers", verifyUser, getUsers);
export default router;
