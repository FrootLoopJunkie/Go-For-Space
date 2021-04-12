import React, {Component} from 'react';
import ListOfPosts from './ListOfPosts'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput : '',
      posts : [],
      isLoading : 'True',
      loadCount : 10,
      username : '',
      password : ''
      // url : ""
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.getPostsQuery = this.getPostsQuery.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.login = this.login.bind(this);
    // this.handleClick = this.handleClick.bind(this)
  }

  loadTenPosts(){
    this.setState({
      loadCount : this.state.loadCount + 10
    })
    if(this.state.searchInput === ''){
      this.getPosts();
    }else{
      this.getPostsQuery();
    }
  }

  handleScroll = (e) => {
    if(Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight){
      this.loadTenPosts();
    }
  }

  handleKeypress(e){
    if(e.key === 'Enter' && e.target.value !== ''){
      this.setState({
        searchInput : e.target.value
      })
      this.getPostsQuery(e.target.value)
    }
  }
  
  // handleClick(url){
  //   this.setState({
  //     url : url
  //   })
  // }

  componentDidMount(){
    this.setState({
      isLoading : 'False'
    })
    this.getPosts();
    window.addEventListener('scroll', this.handleScroll);
  }

  async getPosts(){
    try {
      const result = await fetch(`http://localhost:8000/api/articles`);
      const resultObject = await result.json();
      this.setState({
        posts : resultObject,
      })
    } catch (err) {
      console.log(err)
    }
  }

  async getPostsQuery(query){
    try {
      const result = await fetch(`http://localhost:8000/api/articles/${query}`);
      const resultObject = await result.json();
      this.setState({
        posts : resultObject,
      }) 
    } catch (err) {
      console.log(err)
    }
  }

  handleUsernameChange(e){
    this.setState({
      username : e.target.value
    })
  }

  handlePasswordChange(e){
    this.setState({
      password : e.target.value
    })
  }

  async login(){
    try {
      console.log('loging in')
      const result = await fetch(`http://localhost:8000/api/login`, {
        method : 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      });
    } catch (err) {
      console.log(err)
    }
  }

  async createAccount(){
    try {
      console.log('Creating Account')
      const result = await fetch(`http://localhost:8000/api/account`, {
        method : 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      });
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return(
      <div id='container'>
        <div id='topBar'>
          <div id='loginContainer'>
            <input id='username' placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange}></input>
            <input id='password' placeholder='Password' type='password' value={this.state.password} onChange={this.handlePasswordChange}></input>
            <button id='createAccount' type="submit" onClick={() => this.createAccount()}>Create Account</button>
            <button id='login' type="submit" onClick={() => this.login()}>Login</button>
          </div>
          <input id='searchbar' placeholder='Search for Keywords (eg. Nasa, SpaceX, Mars)' onKeyPress={this.handleKeypress}></input>
        </div>
        <div id='feedContainer' onScroll={this.handleScroll}>
          <ListOfPosts 
            posts={this.state.posts}
            loadCount={this.state.loadCount}
            handleClick={this.handleClick}
          /> 
        </div>
      </div>
    )
  }
}

export default App;
//