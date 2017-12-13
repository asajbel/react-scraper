const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const scrapeController = require("../../controllers/scrapeController");

router.route("/")
	.get(articleController.findAll)
	.post(articleController.create);

router.route("/:id")
	.get(articleController.findById)
	.put(articleController.update);

router.route("/scrape/:subreddit?")
	.post(scrapeController.scrape);

module.exports = router; 