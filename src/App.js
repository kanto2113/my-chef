import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import axios from "axios"

import Navbar from "./components/navbar"
import Home from "./components/pages/home"
import Login from "./components/auth/login"
import Register from "./components/auth/register-user"
import About from "./components/pages/about"
import NewChefContainer from "./components/auth/register-chef"
import ChefProfile from "./components/pages/chef-profile-page"

import UserContext from "./context/UserContext"
import ChefContext from "./context/ChefContext"

const App = () => {

  const [ userData, setUserData ] = useState({
    token: undefined,
    user: undefined,
  })

  const [ chefData, setChefData ] = useState({
    token: undefined,
    chef: undefined,
  })

  useEffect(()=>{
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if(token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }
      const userTokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      )
      if(userTokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: {"x-auth-token": token },
        })
        setUserData({
          token,
          user: userRes.data,
        })}
      const chefTokenRes = await axios.post(
        "http://localhost:5000/chefs/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      )
      if(chefTokenRes.data) {
        const chefRes = await axios.get("http://localhost:5000/chefs/", {
          headers: {"x-auth-token": token },
        })
        setChefData({
          token,
          chef: chefRes.data,
        })
      }
    }
    checkLoggedIn()
  }, [])

  return (
    <BrowserRouter>
      <ChefContext.Provider value={{ chefData, setChefData }}>
      <UserContext.Provider value={{ userData, setUserData }}>
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/registerchef">
            <NewChefContainer />
          </Route>
          <Route path="/chefProfile">
            <ChefProfile />
          </Route>
        </Switch>
        </UserContext.Provider>
        </ChefContext.Provider>
    </BrowserRouter>
  )
}

export default App
