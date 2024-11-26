import express from "express";
// import contactUsRouter from "../src/routes/freshsales.route.js";
import dotenv from "dotenv";
import contactUsRouter from "./routes/freshsales.route.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/contact-us", contactUsRouter);

const port = 8000;
app.listen(port, () => {
  console.warn(`server is listening on port ${port}`);
});
