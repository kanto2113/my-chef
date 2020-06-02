import React, { useState, useEffect } from "react"
import ChefServiceListContainer from "../chefServiceListContainer"
import axios from "axios"

export const ChefServiceContext = React.createContext()

const ChefProfilePage = () => {

  const [ chefService, setChefService ] = useState([])

  const [ chefProfile, setChefProfile ] = useState()
 
  useEffect(()=>{
    let getChefData = async () => {
      const profileRes = await axios.get("http://localhost:5000/chefs/5ed56b9518d80a39549ae5d3")
      setChefProfile({...profileRes.data})
      setChefService([...profileRes.data.profile.services])
    }
    getChefData()
  },[])

  chefService.forEach((el) => {el.firstName = chefProfile.firstName})
  
  console.log(chefProfile)
  
  return (
    <ChefServiceContext.Provider value={[chefService, setChefService]}>
      <div className="background">
        <div className="chef-profile">
          <div className="profile-header">
            <div className="profile-header-text-container">
              <div className="profile-name">
                {chefProfile?.firstName} {chefProfile?.lastName}
              </div>
              <div className="profile-location">
                {chefProfile?.profile.locationCity}, {chefProfile?.profile.locationState}
              </div>
              <div className="profile-bio">
                {chefProfile?.profile.bio}
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