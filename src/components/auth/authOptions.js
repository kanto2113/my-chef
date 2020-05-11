import React from "react"
import { useHistory } from "react-router-dom"

const AuthOptions = () => {

    const history = useHistory()

    const register = () => history.push("/register")
    const login = () => history.push("/login")

    return (
        <div>
            <button onClick={register} className="nav-button">Register</button>
            <button onClick={login} className="nav-button">Log in</button>
        </div>
    )

}

export default AuthOptions