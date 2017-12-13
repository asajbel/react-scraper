const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const scrapeController = require("../../controllers/scrapeController");

// Matches with /api/articles
router.route("/")
	.get(articleController.findAll)
	.post(articleController.create);

// Matches with /api/articles/:id
// id being the _id of the article
router.route("/:id")
	.get(articleController.findById)
	.put(articleController.update);

// Matches with /api/articles/scrape/:subreddit
// subreddit optional being the url name of the subreddit
router.route("/scrape/:subreddit?")
	.post(scrapeController.scrape);

module.exports = router; 