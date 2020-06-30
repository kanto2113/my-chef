import React, { useContext } from "react"
import AuthOptions from "./auth/authOptions"
import UserDataContext from "../context/UserDataContext"

const Navbar = () => {
  const { userData } = useContext(UserDataContext)

  const hamburgerIconHandler = () => {
    let menuItems = Array.from(document.getElementsByClassName("item"))
    menuItems.forEach((e) => {
      if (Array.from(e.classList).includes("active")) {
        e.classList.remove("active")
      } else {
        e.classList.add("active")
      }
    })
  }

  return (
    <nav>
      <ul className="menu">
        <img
          className="icon"
          src="https://i.imgur.com/17Y64el.png"
          alt="img.png"
        />
        <li className="logo">
          <a href="/">HiredKnife</a>
        </li>
        {userData.user ? (
          <>
          </>
        ) : (
          <>
            <li className="item">
              <a href="/register_chef">Create Chef Account</a>
            </li>
          </>
        )}
        <li className="item">
          <AuthOptions></AuthOptions>
        </li>
        <li className="toggle" onClick={hamburgerIconHandler}>
          <span className="bars"></span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
