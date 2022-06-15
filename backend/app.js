import os from "os";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cluster from "cluster";
import env from "dotenv/config";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoDBStore from "connect-mongodb-session";

import testRouter from "./routes/testRouter.js";
import fileRouter from "./routes/fileRouter.js";
import authRouter from "./routes/authRouter.js";

const PORT = process.env.PORT || 4000;
const MongoDBSession = MongoDBStore(session);
const totalCores = os.cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (cluster.isPrimary) {
  console.log(`Number of CPUs: ${totalCores}`);
  console.log(`Primary process running on ${process.pid}`);

  for (let i = 0; i < totalCores; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Forking another Worker");
    cluster.fork();
  });
} else {
  const app = express();

  console.log(`Worker started on process ${process.pid}`);

  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };

  const store = new MongoDBSession({
    uri: process.env.DB_CONNECTION,
    collection: "Sessions",
  });

  app.use(helmet());
  app.use(hpp());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, //24 Hours
      store: store,
    })
  );
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/test", testRouter);
  app.use("/api", fileRouter);
  app.use("/api", authRouter);

  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`${process.pid} connected to DB`);
    })
    .then(() => {
      app.listen(PORT);
    })
    .then(() => {
      console.log(`Worker ${process.pid} is up and running on port ${PORT}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
