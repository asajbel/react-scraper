const db = require("../models");
const cheerio = require("cheerio");
const request = require("request");

module.exports = {
	scrape: function(req, res) {
		let subreddit = req.params.subreddit;
		console.log("Subreddit is", subreddit);
		if(!req.params.subreddit) {
			subreddit = "all"
		}
		console.log("Subreddit is", subreddit);
	  // Make a request for the news section of ycombinator
	  request("https://www.reddit.com/r/"+subreddit, function(error, response, html) {
	    // Load the html body from request into cheerio
	    const $ = cheerio.load(html);
	    // For each element with a "title" class
	    let page = [];
	    let articles = [];
	    let count = $('div#siteTable > div.link').length;
	    $('div#siteTable > div.link').each(function( index ) {
	    	let article = {};
		    article.title = $(this).find('p.title > a.title').text().trim();
		    article.titleLink = $(this).find('p.title > a.title').attr("href").trim();
		    if(article.titleLink[0] === "/") {
		    	article.titleLink = "https://www.reddit.com" + article.titleLink; 
		    }
		    article.score = $(this).find('div.score.unvoted').text().trim();
		    article.user = $(this).find('a.author').text().trim();
		    article.userLink = $(this).find('a.author').attr("href").trim();
		    article.comments = $(this).find('li.first > a').text().trim();
		    article.commentsLink = $(this).find('li.first > a').attr("href").trim();
		    if(subreddit === "all") {
		    	article.subreddit = $(this).find('a.subreddit').text().trim();
		    	article.subredditLink = $(this).find('a.subreddit').attr("href").trim();
		    } else {
		    	article.subreddit = "r/" + subreddit;
		    	article.subredditLink = "https://www.reddit.com/r/" + subreddit;
		    }
		    article.createdAt = Date.now();
		    page.push(article);

		    db.Article.findOne({title: article.title})
		    	.then(function (dbArticle) {
		    		count--;
		    		if(!dbArticle){
		    			count++;
		    			db.Article.create(article)
		    				.then(newArticle => {
		    					count--;
		    					articles.push(newArticle);
		    					if(count == 0) {
					    			console.log("Number of articles: ", articles.length);
					    			res.json(articles);
		    					}
		    				})
		    				.catch(function(err){
		    					console.log(err);
		    				});
		    		}
		    		if (count == 0) {
		    			console.log("Number of articles: ", articles.length);
		    			res.json(articles);
		    		}
		    	})
		    	.catch(function(err) {
		    		console.log(err)
		    	});
		  });
	  });
	}
}