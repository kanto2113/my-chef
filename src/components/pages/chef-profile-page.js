import React, { useState, useEffect } from "react"
import ChefServiceListContainer from "../chefServiceListContainer"
import axios from "axios"

export const ChefServiceContext = React.createContext()

const ChefProfilePage = () => {

  const [ chefService, setChefService ] = useState([])

  const [ chefProfile, setChefProfile ] = useState({
    id: '',
    firstName: '',
    profilePicture: '',
    bio: '',
  })
 
  useEffect(()=>{
    let getChefProfile = async () => {
      const profileRes = await axios.get("http://localhost:5000/chefs/5ecd9467f77f8d3e9054bcc0")
      setChefService([...profileRes.data.profile[0].services])
      setChefProfile({...profileRes.data})
      console.log("profileRes", profileRes)
    }
    getChefProfile()
  },[])

  console.log("chef profile", chefProfile)

  return (
    <ChefServiceContext.Provider value={[chefService, setChefService]}>
      <div className="background">
        <div className="chef-profile">
          <div className="profile-header">
            <div className="profile-header-text-container">
              <div className="profile-name">
                Butch Powers
              </div>
              <div className="profile-location">
                Berkeley, CA
              </div>
              <div className="profile-bio">
                I kick ass and chew bubblegum, and i'm all out of bubblegum.
              </div>
            </div>
            <div>
              <img className="profile-chef-picture" src="https://i.imgur.com/8HicAJg.png" alt=""></img>
            </div>
          </div>  
        </div>
        <div className="chef-services">
          <ChefServiceListContainer></ChefServiceListContainer>
        </div> 
      </div>
    </ChefServiceContext.Provider>

  )
}

export default ChefProfilePage