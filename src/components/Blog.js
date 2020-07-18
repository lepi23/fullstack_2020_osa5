import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
    const [showAllInfo, setShowAllInfo] = useState(false)

    const label = showAllInfo
        ? 'hide' : 'show'

    const handleInfoDisplay = (event) => {
        event.preventDefault()
        setShowAllInfo(!showAllInfo)
    }
    const handleLike = (event) => {
        event.preventDefault()
        likeBlog(blog.id)
    }
    const handleRemove = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog.id)
        }
    }
    if(showAllInfo)
        return(
            <li className='blog'>
                {blog.title} {blog.author}
                <button onClick={handleInfoDisplay} id='display-button'>{label}</button>
                <p>{blog.url}</p>
                <p>
        likes {blog.likes}
                    <button onClick={handleLike} id='like-button'>like</button>
                </p>
                <p>{blog.user.username}</p>

                <button onClick={handleRemove} id='remove-button'>remove</button>
            </li>

        )
    else{
        return(
            <li className='blog'>
                {blog.title} {blog.author}
                <button onClick={handleInfoDisplay}id='display-button'>{label}</button>
            </li>
        )
    }
}

export default Blog
