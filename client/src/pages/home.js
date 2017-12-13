import React, { Component } from "react";
import Article from "../components/Article";
import Modal from '../components/Modal';
import API from "../utils/API";
import User from "../utils/DefaultUser";

class Home extends Component {
	state = {
		articles: [],
		isOpen: false,
		modalText: ""
	};

	toggleModal = (message) => {
    this.setState({
      isOpen: !this.state.isOpen,
      modalText: message
    });
  };

	componentDidMount() {
		this.loadArticles();
	};

	loadArticles = () => {
		API.getArticles()
			.then(res => this.setState({ articles: res.data }))
			.catch(err => console.log(err));
	};

	scrapeArticles = event => {
		API.scrape()
			.then(res => {
				console.log("res: ", res);
				this.loadArticles();
				this.toggleModal(`Found ${res.data.length} new articles.`);
			})
			.catch(err => console.log(err));
	};

	saveArticle = event => {
		const id = event.target.dataset.id;
		console.log(id);
		API.saveArticle(id, User)
			.then(res => {
				this.toggleModal(`Saved the article to your colection.`);
			})
			.catch(err => console.log(err));
	}

	render() {
		return <div className="container-fluid clear-fix">
			<Modal show={this.state.isOpen}
        onClose={this.toggleModal}>
        <p>{this.state.modalText}</p>
      </Modal>
		  <div className="jumbotron jumbotron-fluid ">
		    <div className="container">
		      <h1 className="display-3">React Scraper</h1>
		      <p className="lead">Reddit Edition with MongoDB</p>
          <button id="scrapebtn" onClick={this.scrapeArticles} className="btn btn-reddit">Scrape reddit.com/r/all</button>
		    </div>
		  </div>
		  <div id="articles">
		  	{this.state.articles.map((article, i) => (
          <Article
          	key = {article.titleLink + i}
          	saveHandler = {this.saveArticle}
          	{...article}
          />
        ))}
		  </div>
		</div>
	}

}; 

export default Home;