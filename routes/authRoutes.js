const bcrypt = require("bcrypt");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {
  verifyPassword,
  getUser,
  genHashPassword,
} = require("../utils/authUtils");
const {
  isLoggedIn,
  registerValidator,
} = require("../middleware/authMiddleware");
const PrismaClient = require("../utils/prismaUtils");
const { user } = new PrismaClient();

router.get("/login", isLoggedIn, (req, res) => {
  res.render("login", { username: "kazion500" });
});

router.post(
  "/login",
  body("username").isEmail(),
  body("password").isLength({ min: 5 }),
  isLoggedIn,
  async (req, res) => {
    const { username, password } = req.body;
    const matched = await verifyPassword(username, password);
    if (!matched) {
      return res.render("login", { error: "check your credentials" });
    }
    req.session.user = user;
    res.redirect("/dashboard");
  }
);

router.get("/register", isLoggedIn, (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username").isEmail(),
  body("password").isLength({ min: 5 }),
  isLoggedIn,
  async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.error = errors.array();
      return res.status(400).render("register", { error: req.session.error });
    }
    console.log(errors);
    const uniqueUser = await getUser(username);

    if (uniqueUser) {
      req.session.error = "user already exists";
      return res.render("register", { errors: req.session.error });
    }

    // hash Password
    const hashedPassword = genHashPassword(password);

    const newUser = await user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    if (newUser) {
      return res.redirect("/auth/ogin");
    }
    res.redirect("/auth/register");
  }
);

module.exports = router;
