import React, { useContext } from "react"
import AuthOptions from "./auth/authOptions"
import UserDataContext from "../context/UserDataContext"

const Navbar = () => {
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

<<<<<<< HEAD
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

=======
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
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
<<<<<<< HEAD
        {userData.user ? (
          <>
          </>
          ) : (
          <>
            <li className="item">
              <a href="/register_chef">Register Chef</a>
            </li>
          </>
          ) 
        }
=======
        <li className="item">
          <a href="/">Home</a>
        </li>
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
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
