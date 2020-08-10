import express from "express";
import cron from "node-cron";
import cors from "cors";
const app = express();

import routes from "./routes/routes.js";
import mainFunc from "./logic/mainFunc.js";
const PORT = 3000;

app.use(cors());
app.use("/", routes);

mainFunc();

cron.schedule("0 * * * *", () => {
  mainFunc();
});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
