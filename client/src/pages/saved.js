import React, { Component } from "react";
import Article from "../components/Article";
import Modal from '../components/Modal';
import API from "../utils/API";
import User from "../utils/DefaultUser";

class Saved extends Component {
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
		API.getSaved(User.name)
			.then(res => this.setState({ articles: res.data }))
			.catch(err => console.log(err));
	};

	deleteSaved = event => {
		event.preventDefault();
		const id = event.target.dataset.id;
		API.removeArticle(id, User)
			.then(res => {
				console.log(res.data);
				this.loadArticles();
				this.toggleModal("Article removed from your saved list");
			})
			.catch(err => console.log(err));
	};

	getDetails = event => {
		event.preventDefault();
		
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
		    </div>
		  </div>
		  <div id="articles">
		  	{this.state.articles.map((article, i) => (
          <Article
          	key = {article.titleLink + i}
          	saved = {true}
          	deleteHandler = {this.deleteSaved}
          	{...article}
          />
        ))}
		  </div>
		</div>
	}

}; 

export default Saved;