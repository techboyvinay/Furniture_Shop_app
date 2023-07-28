import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authcont.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddlewares.js";
import { forgotPasswordController } from "./../controllers/authcont.js";

//router object
const router = express.Router();

//routing
//register || method post
router.post("/register", registerController);

//Login || post
router.post("/login", loginController);

//forgot password || POST
router.post("/forgot-password", forgotPasswordController);

//test routs
router.get("/test", requireSignIn, isAdmin, testController);

//protected user rout auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Admin rout auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
