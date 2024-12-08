import express from "express";
import freshsalesController from "../controllers/freshsales.controller.js";
import documents from "../middlewares/documents.middleware.js";
import authenticateRequest from "../middlewares/auth.middleware.js";
const contactUsRouter = express.Router();

contactUsRouter.route("/contact").post(authenticateRequest, freshsalesController.upsertContact);
contactUsRouter.route("/list").post(authenticateRequest, freshsalesController.addContactToListById);
contactUsRouter.route("/document").post(authenticateRequest, documents.single("file"), freshsalesController.uploadDocument);

export default contactUsRouter;
