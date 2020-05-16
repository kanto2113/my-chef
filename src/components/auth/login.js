import React, { useState } from "react"
import axios from "axios"

const Login = (props) => {


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const emailInputHandler = (e) => {
    let cloneCredentials = { ...credentials, email: e.target.value }
    setCredentials(cloneCredentials)
  }

  const passwordInputHandler = (e) => {
    let clonePassword = {...credentials, password: e.target.value }
    setCredentials(clonePassword)
  }

// submit login 

  const onSubmit = () => {
    const loginCreds = {
      email: credentials.email,
      password: credentials.password,
    }

    let isChef = document.getElementById("chefLogin")
    if (isChef.checked === true) {
      axios
        .post("http://localhost:5000/chefs/login", loginCreds)
        .then((res) => console.log(res.data))

    window.location = "/chefProfile"
    }else{
      axios
        .post("http://localhost:5000/users/login", loginCreds)
        .then((res) => console.log(res.data))


//set context with res.user
    
    window.location = "/"
    }

  }

// show password checkbox

  const showPassword = () => {
    let x = document.getElementById("myInput")
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }

  return (
    <div>
      <div>
        Login
        <div>
          <input
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
            id="myInput"
            value={credentials.password}
            onChange={(e) => {
              passwordInputHandler(e)
            }}
            placeholder="Password"
          />
        </div>
        <button onClick={onSubmit}>Login</button>
        <input type="checkbox" onClick={showPassword} />Show Password
        <input type="checkbox" id="chefLogin" />Chef Login
      </div>
    </div>
  )
}

export default Login
