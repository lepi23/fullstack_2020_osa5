import React from 'react'
import Blog from './Blog'

const BlogList = ( props ) => {
    props.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
    return (
        <div id='blogList'>
            {props.blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={props.likeBlog}
                    removeBlog={props.removeBlog}
                />
            )}
        </div>
    )
}
export default BlogList