import express from "express";
import dotenv from "dotenv";
import contactUsRouter from "./routes/freshsales.route.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const requestsLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
});

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(requestsLimit);
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/contact-us", contactUsRouter);

const port = 8000;
app.listen(port, () => {
  console.warn(`server is listening on port ${port}`);
});
