import React from 'react'

const LoginForm = ( props ) => {

    return (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit = {props.login}>
            <div>
                username:
                <input
                type="text"
                value={props.username}
                name="Username"
                onChange={props.handleUsernameChange}
                />
            </div>
            <div>
                password:
                <input
                type="password"
                value={props.password}
                name="Password"
                onChange={props.handlePasswordChange}
                />
            </div>
            <div>
                <button type='submit'>login</button>
            </div>
        </form>
    </div>
    )
}
export default LoginForm
