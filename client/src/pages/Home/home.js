import React, { Component } from "react";
import Article from "../../components/Article";
import Modal from '../../components/Modal';
import API from "../../utils/API";
import User from "../../utils/DefaultUser";
import "./home.css";

class Home extends Component {
	state = {
		articles: [],
		isOpen: false,
		modalText: "",
		subredditName: "all"
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
		event.preventDefault();
		event.stopPropagation();
		API.scrape(this.state.subredditName)
			.then(res => {
				console.log("res: ", res);
				this.loadArticles();
				this.toggleModal(`Found ${res.data.length} new articles.`);
				this.setState({subredditName: "all"})
			})
			.catch(err => console.log(err));
	};

	saveArticle = event => {
		event.preventDefault();
		event.stopPropagation();
		const id = event.target.dataset.id;
		console.log(id);
		API.saveArticle(id, User)
			.then(res => {
				this.toggleModal(`Saved the article to your colection.`);
			})
			.catch(err => console.log(err));
	};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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
          <div className="input-group">
			      <span className="input-group-btn">
			        <button id="scrapebtn" onClick={this.scrapeArticles} className="btn btn-reddit" type="button">Scrape reddit.com/r/</button>
			      </span>
			      <input type="text" className="form-control input-reddit" placeholder="all" name="subredditName" value={this.subredditName} onChange={this.handleInputChange} />
			    </div>
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