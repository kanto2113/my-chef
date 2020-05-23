import React, { useEffect, useState } from "react"
import axios from "axios"

const ChefProfilePage = () => {

  const [ chefProfile, setChefProfile ] = useState({
    id: '',
    name: '',
    profilePicture: '',
    bio: '',
  })

  useEffect(()=> {
    const getChefName = async () => {
      const chefNameRes = await axios.get("http://localhost:5000/chefs/")
      setChefProfile({...chefProfile, name: chefNameRes.data.name})
    }
  })

  // useEffect(()=>{
  //   const getChefProfile = async () => {
  //     const chefRes = await axios.get("http://localhost:5000/profile/5ec30071aff85c0bc4b7522b")
  //     setChefProfile({...chefProfile, bio: chefRes.data.bio})
  //   }
  //   getChefProfile()
  // }, [])

  return (
    <div>
      <h1>
        Chef Profile Page
      </h1>
        <div>
          <img src="https://i.imgur.com/8HicAJg.png" width="100px" height="100px" alt=""></img>
        </div>
        {chefProfile.name}
        <div>
          <textarea 
            id="story"
            name="story"
            rows="3" cols="33">
            placeholder="This is where you talk about what kind of food you can make, what experience you have, and your availability."
          </textarea>
        </div>
        
    </div>
  )
}

export default ChefProfilePage