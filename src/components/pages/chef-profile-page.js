import React, { useState, useEffect } from "react"
import ChefServiceListContainer from "../chefServiceListContainer"
import axios from "axios"

export const ChefServiceContext = React.createContext()

const ChefProfilePage = () => {

  const [ chefService, setChefService ] = useState([])

  const [ chefProfile, setChefProfile ] = useState()
 
  useEffect(()=>{
    let getChefData = async () => {
      const profileRes = await axios.get("http://localhost:5000/chefs/5ecd9467f77f8d3e9054bcc0")
      setChefProfile({...profileRes.data})
      setChefService([...profileRes.data.profile[0].services])

    }
    getChefData()
  },[])

  chefService.forEach((el) => {el.firstName = chefProfile.firstName})
  
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
                {chefProfile?.profile[0].locationCity}, {chefProfile?.profile[0].locationState}
              </div>
              <div className="profile-bio">
                {chefProfile?.profile[0].bio}
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