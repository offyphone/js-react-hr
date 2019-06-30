const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const path = require("path");

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// enablle CORS
app.use(cors());

const PORT = process.env.PORT || 5000;

//app.get("/", (req, res) => res.send(`This app runs on port: ${PORT}`));
// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve statis assets in production
if (process.env.NODE_ENV === "production") {
  // Set statis folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`This app runs on port: ${PORT}`));
