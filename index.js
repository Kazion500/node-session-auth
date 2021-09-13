const express = require("express");
const app = express();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const db = require("./config/db");
const PORT = process.env.PORT || 3000;
const SESSION_NAME = process.env.SESSION_NAME;
const SESSION_SECRET = process.env.SESSION_SECRET;

// Middleware
app.use(
  session({
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool: db,
      tableName: "session",
    }),
  })
);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.listen(PORT, () => {
  console.log("Server Running on port: " + PORT);
});
