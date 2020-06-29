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
            <a href={"/profile/" + userData.user?.id}>Profile</a>
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
