const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const morgan = require("morgan");

const productRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoute");
const uploadRoutes = require("./routes/uploadRoutes");
const { notfound, errorHandler } = require("./middleware/errorMidleware");

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

connectDB();



app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), "frontend", "build", "index.html")
    )
  );
 
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notfound);

app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(
  Port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${Port}`.yellow.bold
  )
);
