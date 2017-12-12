import React, { Component } from "react";
import Article from "../Article"

class Home extends Component {
	state = {
		articles: [
			{
				_id: "1",
				title: "Test 001",
				titleLink: "#",
				commentsLink: "#",
				comments: "### Comments",
				userLink: "#",
				user: "reddituser",
				subLink: "#",
				subreddit: "/r/webdev"
			},
			{
				_id: "2",
				title: "Test 002",
				titleLink: "#",
				commentsLink: "#",
				comments: "### Comments",
				userLink: "#",
				user: "reddituser",
				subLink: "#",
				subreddit: "/r/webdev"
			}
		]
	}

	render() {
		return <div className="container-fluid clear-fix">
		  <div className="jumbotron jumbotron-fluid ">
		    <div className="container">
		      <h1 className="display-3">React Scrapper</h1>
		      <p className="lead">Reddit Edition with MongoDB</p>
		    </div>
		  </div>
		  <div id="articles">
		  	{this.state.articles.map((article, i) => (
          <Article
          	key = {article.titleLink + i}
          	{...article}
          />
        ))}
		  </div>
		</div>
	}

}; 

export default Home;