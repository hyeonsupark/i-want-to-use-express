
var data = [
	{id: 1, author: "Pete Hunt", text: "댓글입니다"},
	{id: 2, author: "Jordan Walke", text: "*또 다른* 댓글입니다"}
];


var CommentBox = React.createClass({displayName: "CommentBox",
	render: function() {
		return (
			React.createElement("div", {className: "commentBox"}, 
				React.createElement("h1", null, "댓글"), 
				React.createElement(CommentList, {data: this.props.data}), 
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
			React.createElement("div", {className: "commentForm"}, 
				"Hello, I am a CommentForm"
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

React.render(React.createElement(CommentBox, {data: data}), document.getElementById('content'));
