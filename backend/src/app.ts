import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";

import logger from "./utils/logger";
import morganmiddleware from "./middlewares/morganmiddleware";

/**
 * App Configuration
 */
dotenv.config();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",")
const app: express.Application = express();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS?.includes(origin)) {
      callback(null, true)
    } else {
      logger.error('Not allowed by CORS')
      callback(new Error('Not allowed by CORS'))
    }
  }
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


/**
 * PORT
 */
const port = process.env.PORT;

/**
 * LOGGING
 */
app.use(morganmiddleware)

/**
 * TEST ROUTE
 */
app.use("/vlad", (req, res) => {
  logger.info("SAMPLE QUERY");
  const data = {
    name: "vlad",
    age: 25,
  };
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

export default app;
