import React, { useState, useEffect, useContext } from "react"
import ChefServiceListContainer from "../chefServiceListContainer"
import axios from "axios"
import UserDataContext from "../../context/UserDataContext"
import { useParams } from "react-router-dom"

export const ChefServiceContext = React.createContext()

const ChefProfilePage = () => {

  const [ chefService, setChefService ] = useState([])
  const [ chefProfile, setChefProfile ] = useState()
  const { userData } = useContext(UserDataContext)

  const { id } = useParams()
 
  useEffect(()=>{
    let getChefProfile = async () => {
      const profileRes = await axios.get(`http://localhost:5000/profile/${id}`)
      setChefProfile(profileRes.data)
      setChefService([...profileRes.data.profile.services])
      if(profileRes.data.profile.profilePicture === 'not set'){profileRes.data.profile.profilePicture = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}
    }
    getChefProfile()

  },[])

  console.log('chef profile', chefProfile)
  
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
                {chefProfile?.profile.locationCity}, {chefProfile?.profile.locationState}
              </div>
              <div className="profile-bio">
                {chefProfile?.profile.bio}
              </div>
            </div>
            <div>
              <img className="profile-chef-picture" src={chefProfile?.profile.profilePicture} alt=""></img>
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