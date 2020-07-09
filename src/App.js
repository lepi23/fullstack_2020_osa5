import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const [errorMessage, setErrorMessage] = useState(null)

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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    localStorage.clear();
    setUser(null)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  if (user === null) {
    return (
    <div>

      <Notification message={errorMessage} />

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
      <BlogList
      blogs={blogs}
      user = {user}
      handleLogout = {handleLogout}
      />
    </div>
  )
}

export default App