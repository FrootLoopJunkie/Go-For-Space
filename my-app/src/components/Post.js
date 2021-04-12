const Post = (props) => {
    const { id, title, summary, publishedAt, newsSite, imageUrl, url } = props.post
    return(
        <div className='postContainer' key={id}>
            <div className='postTextContainer'>
                <h1 className='articleTitle' onClick={() => window.location.href = url}>{title}</h1>
                <p className='newsArticle'>{summary}</p>
                <img className='image' src={imageUrl}></img>
                <p className='publishDate'>{publishedAt}</p>
                <span className='postSite'>{newsSite}</span>
            </div>
        </div>
    )
}

export default Post;