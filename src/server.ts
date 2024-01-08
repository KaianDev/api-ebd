import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import routes from "./routes/routes";
import { requestInterceptor } from "./middlewares/requestInterceptor";
import { originInterceptor } from "./middlewares/originInterceptor";

const app = express();

app.use(cors({ origin: process.env.ORIGIN_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestInterceptor);
app.use(originInterceptor);
app.use(routes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Running at PORT: ${port}`);
  });
};

const regularServer = http.createServer(app);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
runServer(port, regularServer);
