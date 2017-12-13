import axios from "axios";

export default {
	scrape: function(id = "all") {
		return axios.post("/api/articles/scrape/" + id);
	},
	getArticles: function() {
		return axios.get("/api/articles");
	},
};