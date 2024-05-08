import express from "express";
import dbConnect from "./db/user.db.js";
import router from "./Route/user.route.js";
import { config } from "dotenv";
import cors from "cors";
const app = express();

config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
    parameterLimit: 1000000,
    extended: true,
  })
);
const corsOption = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use("/api/v1/user", router);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("error connecting to database", error);
  });

export default app;
