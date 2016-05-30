# I WANT TO USE EXPRESS

#### node.js를 공부하기 위해 만든 repo지만 하는김에 react도 공부했다. 

## 현재까지 깨달은 것

* [한국어 튜토리얼](http://reactkr.github.io/react/docs/tutorial-ko-KR.html)은 예전 버전의 문서로 deprecate 된 것이 많다.
* [원문 튜토리얼](https://facebook.github.io/react/docs/tutorial.html)을 보자.
 * 안봤다가 괜히 시간낭비를 한 것이 좀 있다.
* [marked](https://github.com/chjj/marked)로 js에서 markdown을 사용할수 있다는 것
* `React.render()`는 deprecate됨, `ReactDom.render()`를 쓰자.
* `react-dom.js`는 `react.js`아래 불러오자..
* jsx라는 존재를 알게되었다. 
 * babel과 함께 쓰인다, 원래는 일일이 jsx -> js로 precompile해주거나 모듈로 realtime으로 변환해줬으나 js 발전속도가 너무 빨라 못따라가서 babel을 쓰게 됐다나 뭐라나..

## 앞으로 알아야 할 점

* [x] [require.js](http://www.requirejs.org/)

## 주저리주저리
잠깐 계층을 보자면 body -> content -> commentBox -> commentList -> comment 이렇게 되어있다.

차례차례 볼 것이다.

```json
[
  {"id": 1, "author": "IU", "text": "댓글입니다"},
  {"id": 2, "author": "Suzy", "text": "그러하다"}
 ]
```
이 JSON array를 더미데이터로 삼을 것이다

나는 node.js express 모듈과 함께 `res.json()`을 사용했다.
### 뷰의 코드는 단순하다
```html
<body>
  <div id="content"></div>
  <script type="text/babel" src="javascripts/react/react-example.js"></script>
</body>
```
js가 다 해주실 것이다.

### body#content에 내용을 붙여준다
```javascript
ReactDOM.render(
  <CommentBox url="http://localhost:3000/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
```

`CommentBox`에 인자로 `url`, `pollInterval`을 넘기고 `body#content`에 렌더링한다.

### CommentBox를 보자

```javascript
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
        <CommentForm />
      </div>
    );
  }
});
```
대충 살펴보자면
* `loadCommentsFromServer()` : ajax로 요청을 보내는 함수
* `getInitialState()` : state 초기화
* `componentDidMount()` : 컴포넌트가 DOM tree에 추가됐을 떄 호출됨, 댓글을 받아오고 polling방식으로 실시간으로 데이터가 변하게 끔
* `render()` : `CommentBox`에 들어갈 뷰를 렌더링 해준다. 보면 `this.state.data`를 인자로 넘기는데 데이터가 바뀌면서 값이 넘어간다.

### CommentList를 보자
```javascript
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment key={comment.id} comment={comment} />
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
```

이제 data를 `this.props.data`로 받는다. 받을 때는 정적인 데이터라 그런것일까.. 어렵다.

어찌됐든 map으로 comment를 받고 `key`, `comment`를 인자로 넘기게 된다. 무조건 key를 설정해줘야한다. 아니면 console에서 warning을 뿜는다.

그렇게 `.commentList`와 `commentNodes`는 반환된다.

### Comment를 보자
```javascript
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
```
역시나 comment는 `this.props.comment`이다 그 중 `text`는 `marked()`로 마크다운 형식이 되게끔 한다.

react는 XSS를 예방하기위해 raw html을 escaping한다.

고로 `marked`가 escaping하라고 `sanitize` 옵션을 `true`로 준다. 

### 급 마무리

~~사실 입력창은 만들어두고 서버단에서 처리하기 귀찮아 안했다.~~
가볍게 처리함..
