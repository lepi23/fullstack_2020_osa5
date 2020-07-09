import React from 'react'
import Blog from './Blog'
import RenderUserInfo from './RenderUserInfo'
const BlogList = ( props ) => {

return (
    <div>
      <h2>blogs</h2>
      <RenderUserInfo user = {props.user} handleLogout = {props.handleLogout}/>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default BlogList