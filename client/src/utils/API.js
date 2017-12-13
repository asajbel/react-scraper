import axios from "axios";

export default {
	scrape: function(subreddit = "all") {
		return axios.post("/api/articles/scrape/" + subreddit);
	},
	getArticles: function() {
		return axios.get("/api/articles");
	},
	getUser: function(name) {
		return axios.get("/api/user/" + name);
	},
	getSaved: function() {
		return axios.get("/api/user/articles");
	},
	saveArticle: function(id) {
		return axios.put("/api/user/article/" + id);
	},
	removeArticle: function(id) {
		return axios.delete("/api/user/article/" + id);
	}
};