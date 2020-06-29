import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import axios from "axios"

import Navbar from "./components/navbar"
import Home from "./components/pages/home"
import Login from "./components/auth/login"
import Register from "./components/auth/register-user"
import RegisterChef from "./components/auth/register-chef"
import About from "./components/pages/about"
import Profile from "./components/pages/profile"
import Service from "./components/pages/service"

import UserDataContext from "./context/UserDataContext"

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      )
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        })
        console.log('userRes.data', userRes.data)
        setUserData({
          token,
          user: userRes.data
        })
      }
    }
    checkLoggedIn()
  }, [])

  return (
    <BrowserRouter>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/register_chef">
            <RegisterChef />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/service">
            <Service />
          </Route>
          <Route path="/profile/:id" children={<Profile />}></Route>
        </Switch>
      </UserDataContext.Provider>
    </BrowserRouter>
  )
}

export default App
