var CommentBox = React.createClass({displayName: "CommentBox",
	render: function() {
		return (
			React.createElement("div", {className: "commentBox"}, 
				"Hello, world! I am a CommentBox."
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


React.render(React.createElement(CommentBox, null), document.getElementById('content')
			);
