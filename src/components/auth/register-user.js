import React, { useState } from "react"
import axios from "axios"

const RegisterUser = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    displayName: "",
  })

  const emailInputHandler = (e) => {
    let cloneCredentials = { ...credentials, email: e.target.value }
    setCredentials(cloneCredentials)
  }

  const passwordInputHandler = (e) => {
    let cloneCredentials = { ...credentials, password: e.target.value }
    setCredentials(cloneCredentials)
  }

  const passwordCheckInputHandler = (e) => {
    let cloneCredentials = { ...credentials, passwordCheck: e.target.value }
    setCredentials(cloneCredentials)
  }

  const displayNameInputHandler = (e) => {
    let cloneCredentials = { ...credentials, displayName: e.target.value }
    setCredentials(cloneCredentials)
  }

  const onSubmit = () => {
    const newUserCreds = {
      email: credentials.email,
      password: credentials.password,
      passwordCheck: credentials.passwordCheck,
      displayName: credentials.displayName,
    }

    axios
      .post("http://localhost:5000/users/register", newUserCreds)
      .then((res) => console.log(res.data))

    window.location = "/login"
  }

  const showPassword = () => {
    let x = document.getElementById("myInput")
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }

    let y = document.getElementById("myInput2")
    if (y.type === "password") {
      y.type = "text"
    } else {
      y.type = "password"
    }
  }

  return (
    <div className="app-container">
      <div className="register-input-parent">
        Register New User
        <div>
          <input
            className="register-input"
            value={credentials.email}
            onChange={(e) => {
              emailInputHandler(e)
            }}
            placeholder="Email Address"
          />
        </div>
        <div>
          <input
            type="password"
            className="register-input"
            id="myInput"
            value={credentials.password}
            onChange={(e) => {
              passwordInputHandler(e)
            }}
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            className="register-input"
            id="myInput2"
            value={credentials.passwordCheck}
            onChange={(e) => {
              passwordCheckInputHandler(e)
            }}
            placeholder="Re-Type Password"
          />
        </div>
        <div>
          <input
            className="register-input"
            value={credentials.displayName}
            onChange={(e) => {
              displayNameInputHandler(e)
            }}
            placeholder="Display Name"
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
        <input type="checkbox" onClick={showPassword} />
        Show Password
      </div>
    </div>
  )
}

export default RegisterUser
