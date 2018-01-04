import React, { Component } from "react";
import API from "../../utils/API";
import User from "../../utils/DefaultUser";
import "./detail.css";

class Detail extends Component {
  state = {
    notes: [],
    _id: "",
    title: "No Article Found",
    titleLink: "",
    score: "",
    user: "",
    userLink: "",
    comments: "",
    commentsLink: "",
    subreddit: "",
    subredditLink: "",
    commentText: ""
  };

  componentDidMount() {
    this.loadNotes();
  };

  loadNotes = () => {
    API.getArticle(this.props.match.params.id)
      .then(res => {
        this.setState({ commentText: "", ...res.data });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
		event.stopPropagation();
		const note = {
			text: this.state.commentText,
			user: User.name
		}
    API.createNote(this.state._id, note)
    	.then(res => this.loadNotes())
    	.catch(err => console.log(err));
  };

  render() {
  	return <div className="container-fluid clear-fix">
		  <div className="jumbotron jumbotron-fluid ">
		    <div className="container">
		      <a className="jumbolink" href={this.state.titleLink} target="_blank">
            <h1 className="display-3">{this.state.title}</h1>
          </a>
          <p className="lead">
            <a className="jumbolink" href={this.state.commentsLink} target="blank">{this.state.comments} </a>
            <a className="jumbolink" href={this.state.userLink} target="blank">{this.state.user} </a>
            <a className="jumbolink" href={this.state.subredditLink} target="blank">{this.state.subreddit} </a>
          </p>
		    </div>
		  </div>
		  <div id="notes" className="container notes">
		  	<h3>Comments:</h3>
		  	<hr/>
		  	{this.state.notes.map((note, i) => (
          <p className="note" key = {note.text + i}>
          	{note.text}
          </p>
        ))}
			  <form>
				  <div className="form-group">
				    <label className="lbl">Enter Comment</label>
				    <textarea 
				    	className="form-control" 
				    	id="commentText" 
				    	rows="3" 
				    	name="commentText" 
              value={this.state.commentText}
	            onChange={this.handleInputChange}></textarea>
				  </div>
          <div className="buttons">
  				  <button 
  				  	type="button" 
  				  	className="btn btn-comment" 
  				  	onClick={this.handleFormSubmit}
  				  >
  				  	Submit
  				  </button>
          </div>
				</form>
		  </div>
		</div>
  }
}

export default Detail;