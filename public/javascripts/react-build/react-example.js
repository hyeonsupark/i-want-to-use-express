//var React = require('react');
//var ReactDOM = require('react-dom');


var CommentBox = React.createClass({displayName: "CommentBox",
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			method: 'POST',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};	
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			React.createElement("div", {className: "commentBox"}, 
				React.createElement("h1", null, "댓글"), 
				React.createElement(CommentList, {data: this.state.data}), 
				React.createElement(CommentForm, null)
			)
		);
	}
});

var CommentList = React.createClass({displayName: "CommentList",
	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
			return (
				React.createElement(Comment, {key: comment.id, comment: comment}, 
					comment.text
				)
			);
		});
		return (
			React.createElement("div", {className: "commentList"}, 
				commentNodes	
			)
		);
	}
});

var CommentForm = React.createClass({displayName: "CommentForm",
	render: function() {
		return (
			React.createElement("form", {className: "commentForm"}, 
				React.createElement("input", {type: "text", placeholder: "이름"}), 
				React.createElement("input", {type: "text", placeholder: "내용을 입력하세요..."}), 
				React.createElement("input", {type: "submit", value: "올리기"})
			)	
		);
	}
});

var Comment = React.createClass({displayName: "Comment",
	render: function() {
		var rawMarkup = marked(this.props.comment.text.toString(), {sanitize: true});
		return (
			React.createElement("div", {className: "comment"}, 
				React.createElement("h2", {className: "commentAuthor"}, 
					this.props.comment.author
				), 
				React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
			)
		);
	}
});

React.render(React.createElement(CommentBox, {url: "http://localhost:3000/comments", pollInterval: 2000}), document.getElementById('content'));
