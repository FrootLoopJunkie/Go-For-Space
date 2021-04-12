import Post from './Post'

const ListOfPosts = (props) => {
    return(
        <div id='postFeed'>
            {props.posts.map((post, index) => {
                if(index < props.loadCount){
                    return(
                        <Post 
                            post={post}
                            handleClick={props.handleClick}
                        />
                    )
                }
            })}
        </div>
    )
}

export default ListOfPosts;