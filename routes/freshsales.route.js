import express from "express";
import freshsalesController from "../controllers/freshsales.controller.js";
import documents from "../middlewares/documents.middleware.js";
const contactUsRouter = express.Router();

contactUsRouter.route("/contact").post(freshsalesController.upsertContact);
contactUsRouter.route("/list").post(freshsalesController.addContactToListById);
contactUsRouter.route("/document").post(documents.single("file"), freshsalesController.uploadDocument);

export default contactUsRouter;
