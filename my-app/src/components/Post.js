const Post = (props) => {
    const { id, title, summary, publishedAt, newsSite } = props.post
    return(
        <div className='postContainer' key={id}>
            <div className='postTextContainer'>
                <h1 className='articleTitle'>{title}</h1>
                <p className='newsArticle'>{summary}</p>
                <span className='publishDate'>{publishedAt}</span>
                <span className='postSite'>{newsSite}</span>
            </div>
        </div>
    )
}

export default Post;