import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

import ChefServiceListContainer from "../chefServiceListContainer"
import EditChefServiceListContainer from "../editChefServiceListContainer"
import LocationSelector from "../locationSelector"

import UserDataContext from "../../context/UserDataContext"
export const ChefServiceContext = React.createContext()
export const ChefProfileContext = React.createContext()

const ChefProfilePage = () => {

  const [ chefService, setChefService ] = useState([])
  const [ chefProfile, setChefProfile ] = useState()
  const { userData } = useContext(UserDataContext)

  const { id } = useParams()

  const isChef = userData.user?.id === id

  useEffect(()=>{
    let getChefProfile = async () => {
      const profileRes = await axios.get(`http://localhost:5000/profile/${id}`)
      setChefProfile(profileRes.data)
      setChefService([...profileRes.data.profile.services])
      if(profileRes.data.profile.profilePicture === 'not set'){profileRes.data.profile.profilePicture = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}
    }
    getChefProfile()

  },[])

  chefService.forEach((el) => {el.firstName = chefProfile.firstName})


  // edit chef profile input handlers

  const chefBioInputHandler = (e) => {
    let cloneChefProfile = {...chefProfile, profile: {...chefProfile.profile, bio: e.target.value}}
    setChefProfile(cloneChefProfile)
  }

  const newServiceButtonHandler = () => {
    let newService = {
      _author: chefProfile._id,
      firstName: chefProfile.firstName,
      title: undefined,
      description: undefined,
      cost: undefined,
    }
    
    let cloneChefService = chefService.concat(newService)
    setChefService(cloneChefService)
  
}

  return (
    <ChefProfileContext.Provider value={[chefProfile, setChefProfile]}>
    <ChefServiceContext.Provider value={[chefService, setChefService]}>
      {isChef ? (
      <> 
        <div className="background">
          <div className="chef-profile">
            <div className="profile-header">
              <div className="profile-header-text-container">
                <div className="profile-name">
                  {chefProfile?.firstName} {chefProfile?.lastName}
                </div>
                <LocationSelector></LocationSelector>
                <div>
                  <textarea defaultValue={chefProfile?.profile.bio} className="profile-bio-edit" maxLength="200" cols="50" rows="4" placeholder="Brief description of yourself and your skills." onChange={(e)=>{chefBioInputHandler(e)}}>
                  </textarea>
                </div>
              </div>
              <div>
                <img className="profile-chef-picture" src={chefProfile.profile?.profilePicture} alt=""></img>
              </div>
            </div>  
          </div>
          <div className="chef-services">
            <EditChefServiceListContainer></EditChefServiceListContainer>
          </div> 
          <div className="chef-profile-edit-tools">
            <button className="edit-button">Save Service</button>
            <button onClick={newServiceButtonHandler} className="edit-button">Create New Service</button>
          </div>
        </div>
      </>

      ) : (

      <> 
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
      </>)}
    </ChefServiceContext.Provider>
    </ChefProfileContext.Provider>
  )
}

export default ChefProfilePage