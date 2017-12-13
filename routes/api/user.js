const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/:name")
	.get(userController.findByName);

router.route("/articles")
	.get(userController.getSaved);

router.route("/article/:id")
	.put(userController.saveArticle)
	.delete(userController.removeArticle);

module.exports = router; 