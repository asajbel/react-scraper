const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with /api/user
router.route("/")
	.post(userController.create);

// Matches with /api/user/:name
router.route("/:name")
	.get(userController.findByName);

// Matches with /api/user/articles/:name
// name being name of the user
router.route("/articles/:name")
	.get(userController.getSaved);

// Matches with /api/user/article/:id
// id being _id of the article
router.route("/article/:id")
	.put(userController.saveArticle)
	.delete(userController.removeArticle);

module.exports = router; 