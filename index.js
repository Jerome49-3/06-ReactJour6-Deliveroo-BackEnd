require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_CORS_FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//*************** MONGOOSE ***************/
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
//*************** MODELS ***************/
const Caddy = require("./models/Caddy");
//*************** SOCKET.IO ***************/
const { createServer } = require("http");
const { Server } = require("socket.io");
// console.log("process.env.URL_CORS_FRONTEND:", process.env.URL_CORS_FRONTEND);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.URL_CORS_FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
});
io.on("connection", (socket) => {
  console.log("socket.id:", socket.id);
});
io.on("disconnect", (error) => {
  console.log("disconnect");
  // console.log("error on disconnecct:", error);
});
// io.engine.on("connection_error", (error) => {
//   console.log("error:", error);
// });
Caddy.watch([], { fullDocument: "updateLookup" }).on(
  "change",
  (caddyUpdated) => {
    io.emit("caddyUpdated", caddyUpdated);
    console.log("caddyUpdated:", caddyUpdated);
  }
);
io.on("error", (err) => {
  console.log(err.message);
  console.log(err.description);
  console.log(err.context);
});
//*************** ROUTES ***************/
const addRestaurant = require("./routes/POST/addRestaurant.routes");
const getRestaurant = require("./routes/GET/getRestaurant.routes");
const addQuantity = require("./routes/PUT/addQuantity.routes");
const removeQuantity = require("./routes/PUT/removeQuantity.routes");
const addCaddy = require("./routes/POST/addCaddy.routes");
const getCaddy = require("./routes/GET/getCaddy.routes");

app.use(addRestaurant);
app.use(getRestaurant);
app.use(addQuantity);
app.use(removeQuantity);
app.use(addCaddy);
app.use(getCaddy);

app.get("/", (req, res) => {
  console.log("Welcome to my deliveroo's replica");
  res.status(200).json({ message: "Welcome to my deliveroo's replica" });
});
app.all("*", (req, res) => {
  // console.log("all routes");
  console.log("req.path:", req.path);
  if (
    req.path.startsWith("/socket.io/") ||
    req.method === "OPTIONS" ||
    req.path === "/favicon.ico"
  ) {
    return; // ne log rien
  }
  res.status(404).json({ message: "Not found" });
});
// Northflank va nous fournir une variable process.env.PORT
// app.listen(process.env.PORT, () => {
//   console.log("Server started on port:", process.env.PORT);
// });
httpServer.listen(process.env.PORT, () => {
  console.log("Server started on port:", process.env.PORT);
});
