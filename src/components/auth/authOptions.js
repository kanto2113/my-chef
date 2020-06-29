import React, { useContext } from "react"
import UserDataContext from "../../context/UserDataContext"

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserDataContext)

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    })
    localStorage.setItem("auth-token", "")
  }

  return (
    <ul className="menu">
      {userData.user ? (
        <>
          <li className="item nav-button">
<<<<<<< HEAD
            <a href={"/profile/" + userData.user?.id}>Profile</a>
=======
            <a href={"/chefProfile/" + userData.user?.id}>Profile</a>
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
          </li>
          <li onClick={logout} className="item nav-button">
            <a href="/logout">Log Out</a>
          </li>
        </>
      ) : (
        <>
          <li className="item nav-button">
            <a href="/register">Sign Up</a>
          </li>
          <li className="item nav-button">
            <a href="/login">Login</a>
          </li>
        </>
      )}
    </ul>
  )
}

export default AuthOptions
