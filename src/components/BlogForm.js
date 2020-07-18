import React, { useState } from 'react'

const BlogForm = ( { createNewBlog } ) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }
    const addBlog = (event) => {
        event.preventDefault()
        const newBlogObject = {
            author: author,
            title: title,
            url: url
        }
        createNewBlog(newBlogObject)

    }
    return(
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    <label>title: </label>
                    <input
                        id='title'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label>author: </label>
                    <input
                        id='author'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    <label>url: </label>
                    <input
                        id='url'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit" id='create-button'>create</button>
            </form>
        </div>
    )}
export default BlogForm