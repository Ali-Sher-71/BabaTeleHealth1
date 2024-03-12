const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth.js");
const cors = require("cors");
// const protectedRoute = require("./src/routes/protectedAuth.js");
const db = require("./src/database/db.js");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
// app.use("/protected", protectedRoute);
const PORT = 5000;
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.json({ limit: "8mb" }));
app.use(
  bodyParser.urlencoded({ extended: false, limit: "8mb", parameterLimit: 1000 })
);
