import React from 'react'

const RenderUserInfo = (props) => (
    <p>
        {props.user.name} logged in
        <button type="button" onClick={props.handleLogout}> logout </button>
    </p>
)

export default RenderUserInfo