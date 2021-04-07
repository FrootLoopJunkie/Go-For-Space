import React, {Component} from 'react';
import ListOfPosts from './ListOfPosts'


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput : null,
      posts : [],
      isLoading : 'True'
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.getPosts = this.getPosts.bind(this)
  }

  componentDidMount(){
    this.setState({
      isLoading : 'False'
    })
    this.getPosts();
  }

  async getPosts(dataToRequest){
    console.log('Getting Posts...')
    const result = await fetch('http://localhost:8000/api')
    const resultObject = await result.json();
    this.setState({
      posts : resultObject
    })
  }

  render(){
    return(
      <div id='feedContainer'>
        <ListOfPosts posts={this.state.posts}/> 
      </div>
    )
  }
}

export default App;
//