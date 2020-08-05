import express from "express";
import cron from "node-cron";
const app = express();

import routes from "./routes/routes.js";
import mainFunc from "./logic/mainFunc.js";
const PORT = 3000;

app.use("/", routes);

mainFunc();

cron.schedule("0 * * * *", () => {
  mainFunc();
});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
