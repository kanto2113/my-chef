import React from "react"
// import { useHistory } from "react-router-dom"

const AuthOptions = () => {

    // const history = useHistory()

    // const register = () => history.push("/register")
    // const login = () => history.push("/login")

    return (
        <ul className="menu">
            <li className="item nav-button"><a href="/login">Login</a></li>
            <li className="item nav-button"><a href="/register">Sign Up</a></li>
        </ul>
    )

}

export default AuthOptions