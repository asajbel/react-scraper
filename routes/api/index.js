const router = require("express").Router();
const articleRoutes = require("./article");
const userRoutes = require("./user");

// Book routes
router.use("/articles", articleRoutes);
router.use("/user", userRoutes);

module.exports = router;
