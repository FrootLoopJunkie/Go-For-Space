import Post from './Post'

const ListOfPosts = (props) => {
    return(
        <div id='postFeed'>
            {props.posts.map(post => {
                return(
                    <Post post={post}/>
                )
            })}
        </div>
    )
}

export default ListOfPosts;