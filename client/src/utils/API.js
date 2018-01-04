import axios from "axios";

export default {
	scrape: function(subreddit = "all") {
		return axios.post("/api/articles/scrape/" + subreddit);
	},
	getArticles: function() {
		return axios.get("/api/articles");
	},
	getArticle: function(id) {
		return axios.get("/api/articles/" + id)
	},
	getUser: function(name) {
		return axios.get("/api/user/" + name);
	},
	getSaved: function(name) {
		return axios.get("/api/user/articles/" + name);
	},
	saveArticle: function(id, userObj) {
		return axios.put("/api/user/article/" + id, userObj);
	},
	removeArticle: function(id, userObj) {
		return axios.delete("/api/user/article/" + id, {params: userObj});
	},
	createUser: function(userObj) {
		return axios.post("/api/user", userObj);
	},
	createNote: function(articleId, noteObj) {
		return axios.post("/api/articles/note/" + articleId, noteObj);
	}
};