import React, {Component} from 'react';
import ListOfPosts from './ListOfPosts'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput : null,
      posts : ['1', '2'],
      isLoading : 'True'
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount(){
    this.setState({
      isLoading : 'False'
    })
  }

  getData(dataToRequest){
    //This will call to the express server to request the data it has stored
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