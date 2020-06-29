import React, { useState, useContext } from "react"
import axios from "axios"
import UserDataContext from "../../context/UserDataContext"

const RegisterChef = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
  })

  const { setUserData } = useContext(UserDataContext)

  // Input Handlers

  const newUserFirstNameInputHandler = (e) => {
    let cloneNewUser = { ...newUser, firstName: e.target.value }
    setNewUser(cloneNewUser)
  }

  const newUserLastNameInputHandler = (e) => {
    let cloneNewUser = { ...newUser, lastName: e.target.value }
    setNewUser(cloneNewUser)
  }

  const emailInputHandler = (e) => {
    let cloneNewUser = { ...newUser, email: e.target.value }
    setNewUser(cloneNewUser)
  }

  const passwordInputHandler = (e) => {
    let cloneNewUser = { ...newUser, password: e.target.value }
    setNewUser(cloneNewUser)
  }

  const passwordCheckInputHandler = (e) => {
    let cloneNewUser = { ...newUser, passwordCheck: e.target.value }
    setNewUser(cloneNewUser)
  }

  // Submit Register User Form

  const onSubmit = () => {
    const newUserCreds = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      passwordCheck: newUser.passwordCheck,
    }

    axios
      .post("http://localhost:5000/users/register_chef", newUserCreds)
      .then((res) => {
        const newUserLogin = {
          email: res.data.email,
          password: newUser.password,
        }
        axios
          .post("http://localhost:5000/users/login", newUserLogin)
          .then((response) => {
            setUserData({
              token: response.data.token,
              user: response.data.user,
            })
            localStorage.setItem("auth-token", response.data.token)
            window.location = "/"
          })
      })
      .catch((err) => console.log(err))
  }

  // Show Password

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
    <div className="register-form-parent">
      <div className="register-title">User Account Creation</div>
      <div>
        <input
          className="register-input"
          onChange={(e) => {
            newUserFirstNameInputHandler(e)
          }}
          value={newUser.firstName}
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          className="register-input"
          onChange={(e) => {
            newUserLastNameInputHandler(e)
          }}
          value={newUser.lastName}
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          className="register-input"
          value={newUser.email}
          onChange={(e) => {
            emailInputHandler(e)
          }}
          placeholder="Email Address"
        />
      </div>
      <div>
        <input
          className="register-input"
          type="password"
          id="myInput"
          value={newUser.password}
          onChange={(e) => {
            passwordInputHandler(e)
          }}
          placeholder="Password"
        />
      </div>
      <div>
        <input
          className="register-input"
          type="password"
          id="myInput2"
          value={newUser.passwordCheck}
          onChange={(e) => {
            passwordCheckInputHandler(e)
          }}
          placeholder="Re-Type Password"
        />
      </div>
      <div className="register-submit">
        <button onClick={onSubmit}>Submit</button>
        <div>
          <input type="checkbox" onClick={showPassword} />
          Show Password
        </div>
      </div>
    </div>
  )
}

export default RegisterChef

// const newUserProfilePictureInputHandler = async () => {
//   const formData = new FormData()
//   formData.append("image", inputRef.current.files[0])

//   for (var pair of formData.entries()) {
//     console.log("formData", pair[1])
//   }

//   let pictureResponse = await axios.post(
//     "http://localhost:5000/api/User-profile-picture",
//     formData
//   )

//   console.log("picture response", pictureResponse)

//   let cloneNewUser = {...newUser, profilePicture: inputRef.current.files[0]}
//   setNewUser(cloneNewUser)

// <div>
//   <input
//     ref={inputRef}
//     type="file"
//     accept="image/*"
//     onChange={newUserProfilePictureInputHandler}
//     placeholder="Profile Picture URL"
//   />
// </div>
