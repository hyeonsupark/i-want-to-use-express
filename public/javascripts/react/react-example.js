//var React = require('react');
//var ReactDOM = require('react-dom');


var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			method: 'GET',
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
	handleCommentSubmit: function(comment) {
		$.ajax({
			url: this.props.url,
			method: 'POST',
			dataType: 'json',
			data: comment,
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
			<div className="commentBox">
				<h1>댓글</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
			return (
				<Comment key={comment.id} comment={comment}/>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}	
			</div>
		);
	}
});

var CommentForm = React.createClass({
	getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if(!text || !author) {
			return ;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="이름" value={this.state.author} onChange={this.handleAuthorChange} />
				<input type="text" placeholder="내용을 입력하세요..." value={this.state.text} onChange={this.handleTextChange} />
				<input type="submit" value="올리기" />
			</form>	
		);
	}
});

var Comment = React.createClass({
	render: function() {
		var rawMarkup = marked(this.props.comment.text.toString(), {sanitize: true});
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.comment.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
});

ReactDOM.render(<CommentBox url="http://wearedoing.party:3000/comments" pollInterval={2000}/>, document.getElementById('content'));
