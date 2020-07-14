import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import RenderUserInfo from './components/RenderUserInfo'
import Togglable from './components/Togglable'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ notification, setNotification ] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const notifyWith = (message, type='success') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            notifyWith(`${user.username} logged in succesfully`)
            setUsername('')
            setPassword('')
        } catch (exception) {
            notifyWith('wrong username or password', 'error')
            setTimeout(() => {
            }, 5000)
        }
    }
    const handleLogout = async (event) => {
        event.preventDefault()
        localStorage.clear()
        notifyWith(`logout ${user.username} succesfully`)
        setUser(null)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`,'success')

            })
    }
    const like = (id) => {
        const blog = blogs.find(n => n.id === id)

        const changedBlog =
    {
        user:blog.user.id,
        likes: blog.likes +1,
        author:blog.author,
        title:blog.title,
        url: blog.url
    }
        blogService
            .update(id, changedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                notifyWith(
                    'error like not subscribed'
                )
            })
    }
    //blogin poisto luettelosta
    const removeBlog = (id) => {
        const blog = blogs.find(n => n.id === id)
        console.log(blog)
        blogService.remove(id)
        const newBlogs = blogs.filter(blog => blog.id.toString() !== id)
        setBlogs(newBlogs)
        notifyWith(`${blog.title} succesfully removed`)

    }
    if (user === null) {
        return (
            <div>

                <Notification notification={notification} />

                <LoginForm
                    login={handleLogin}
                    username={username}
                    handleUsernameChange={handleUsernameChange}
                    password={password}
                    handlePasswordChange={handlePasswordChange}
                />
            </div>
        )
    }
    return (
        <div>
            <Notification notification={notification} />
            <h2>blogs</h2>
            <RenderUserInfo user = {user} handleLogout = {handleLogout}/>
            <Togglable buttonLabel ='new blog'>
                <BlogForm
                    createNewBlog={addBlog}
                    ref={blogFormRef}
                />
            </Togglable>
            <BlogList
                blogs = {blogs}
                likeBlog = {like}
                removeBlog= {removeBlog}
            />
        </div>
    )
}

export default App