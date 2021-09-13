const router = require("express").Router();
const { isAuth } = require("../middleware/authMiddleware");

router.get("/", isAuth, (req, res) => {
  const user = req.session.user;
  if (!user) {
    return redirect("/login");
  }
  res.render("index", { user });
});

module.exports = router;
