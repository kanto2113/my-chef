import React, { useState, useContext } from "react"
import axios from "axios"
import UserDataContext from "../../context/UserDataContext"

const Login = () => {

  const {setUserData} = useContext(UserDataContext)

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

// Input Handlers

  const emailInputHandler = (e) => {
    let cloneCredentials = { ...credentials, email: e.target.value }
    setCredentials(cloneCredentials)
  }

  const passwordInputHandler = (e) => {
    let clonePassword = {...credentials, password: e.target.value }
    setCredentials(clonePassword)
  }

// Submit Login

  const onSubmit = () => {
    const loginCreds = {
      email: credentials.email,
      password: credentials.password,
    }
    axios
      .post("http://localhost:5000/users/login", loginCreds)
      .then((res) => {
        setUserData({
          token: res.data.token,
          user: res.data.user
        })
        localStorage.setItem("auth-token", res.data.token)
        window.location = "/"
      })
    
  }

// Show Password

  const showPassword = () => {
    let x = document.getElementById("myInput")
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }

  return (
    <div className="login-form-parent">
      <div className="login-title">
        Login
      </div>
      <div className="login-input">
        <input
          value={credentials.email}
          onChange={(e) => {
            emailInputHandler(e)
          }}
          placeholder="Email Address"
        />
      </div>
      <div className="login-input">
        <input
          type="password"
          id="myInput"
          value={credentials.password}
          onChange={(e) => {
            passwordInputHandler(e)
          }}
          placeholder="Password"
        />
      </div>
      <input type="checkbox" onClick={showPassword} />  Show Password
      <div className="login-submit">
        <button onClick={onSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login
