import React from "react";
import "./article.css";

const Article = props => (
	<div className="row">
		<article className="article col-xs-12">
			<div className="top row">
				<div className="col-md-9">
					<a id="articleLink" className="articleLink nav-link text-light" href={props.titleLink} target="blank_"><h1 id="articleTitle">{props.title}</h1></a>
				</div>
				<div className="col-md-3 buttons">
					{ !props.saved ?
						<button className="btn btn-save" data-id={props._id}>Save Article</button>
						:
						<div>
							<button className="btn btn-details" data-id={props._id}>Article Details</button>
							<button className="btn btn-delete" data-id={props._id}>Delete Article</button>
						</div>
					}
				</div>
			</div>
			<div className="row">
				<div className="bottom col-xs-12">
					<a id="commentLink" className="bot-link" href={props.commentsLink} target="blank">{props.comments}</a>
					<a id="userLink" className="bot-link" href={props.userLink} target="blank">{props.user}</a>
					<a id="subLink" className="bot-link" href={props.subLink} target="blank">{props.subreddit}</a>
				</div>
			</div>
		</article>
	</div>
);

export default Article;