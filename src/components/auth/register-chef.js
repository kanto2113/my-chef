import React, { useState } from "react"
import axios from "axios"

const RegisterChef = () => {

  const [newChef, setNewChef] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
  })

  const newChefFirstNameInputHandler = (e) => {
    let cloneNewChef = { ...newChef, firstName: e.target.value }
    setNewChef(cloneNewChef)
  }

  const newChefLastNameInputHandler = (e) => {
    let cloneNewChef = { ...newChef, lastName: e.target.value }
    setNewChef(cloneNewChef)
  }

  const emailInputHandler = (e) => {
    let cloneNewChef = { ...newChef, email: e.target.value }
    setNewChef(cloneNewChef)
  }

  const passwordInputHandler = (e) => {
    let cloneNewChef = { ...newChef, password: e.target.value }
    setNewChef(cloneNewChef)
  }

  const passwordCheckInputHandler = (e) => {
    let cloneNewChef = { ...newChef, passwordCheck: e.target.value }
    setNewChef(cloneNewChef)
  }

// submit register chef form

  const onSubmit = () => {
    const newChefCreds = {
      name: newChef.name,
      email: newChef.email,
      password: newChef.password,
      passwordCheck: newChef.passwordCheck,
      profilePicture: newChef.profilePicture,
    }

    axios
      .post("http://localhost:5000/chefs/register", newChefCreds)
      .then((res) => console.log(res.data))

    const newChefLogin = {
      email: newChef.email,
      password: newChef.password,
      passwordCheck: newChef.passwordCheck
    }

    axios
      .post("http://localhost:5000/chefs/login", newChefLogin)
      .then((res)=> console.log(res.data))

    window.location = "/chefProfile"
  }

// show password

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
      <div className="register-title">
        Chef Account Creation
      </div>
      <div>
        <input
          className="register-input"
          onChange={(e) => {
            newChefFirstNameInputHandler(e)
          }}
          value={newChef.firstName}
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          className="register-input"
          onChange={(e) => {
            newChefLastNameInputHandler(e)
          }}
          value={newChef.lastName}
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          className="register-input"
          value={newChef.email}
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
          value={newChef.password}
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
          value={newChef.passwordCheck}
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


      // const newChefProfilePictureInputHandler = async () => {
      //   const formData = new FormData()
      //   formData.append("image", inputRef.current.files[0])

      //   for (var pair of formData.entries()) {
      //     console.log("formData", pair[1])
      //   }

      //   let pictureResponse = await axios.post(
      //     "http://localhost:5000/api/chef-profile-picture",
      //     formData
      //   )

      //   console.log("picture response", pictureResponse)

      //   let cloneNewChef = {...newChef, profilePicture: inputRef.current.files[0]}
      //   setNewChef(cloneNewChef)
      
      // <div>
      //   <input
      //     ref={inputRef}
      //     type="file"
      //     accept="image/*"
      //     onChange={newChefProfilePictureInputHandler}
      //     placeholder="Profile Picture URL"
      //   />
      // </div>