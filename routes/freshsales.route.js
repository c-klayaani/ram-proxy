import express from "express";
import freshsalesController from "../controllers/freshsales.controller.js";
const contactUsRouter = express.Router();

contactUsRouter.route("/contact").post(freshsalesController.upsertContact);
contactUsRouter.route("/list").post(freshsalesController.addContactToListById);

export default contactUsRouter;
