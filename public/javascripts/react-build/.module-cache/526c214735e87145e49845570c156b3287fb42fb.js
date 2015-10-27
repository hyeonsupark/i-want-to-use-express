var CommentBox = React.createClass({displayName: "CommentBox",
	render: function() {
		return (
			React.createElement("div", {className: "commentBox"}, 
				React.createElement("h1", null, "댓글"), 
				React.createElement(CommentList, null), 
				React.createElement(CommentForm, null)
			)
		);
	}
});

var CommentList = React.createClass({displayName: "CommentList",
	render: function() {
		return (
			React.createElement("div", {className: "commentList"}, 
				"Hello, I am a CommentList"
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


React.render(React.createElement(CommentBox, null), document.getElementById('content'));
