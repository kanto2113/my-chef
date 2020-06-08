import React, { useState, useEffect } from "react"
import axios from "axios"

import EditChefServiceListContainer from "../editChefServiceListContainer"
import LocationSelector from "../locationSelector"

export const EditChefProfileContext = React.createContext()
export const EditChefServiceContext = React.createContext()

const EditChefProfilePage = (props) => {

  const [ chefService, setChefService ] = useState([{}])

  const [ chefProfile, setChefProfile ] = useState({})
  
 
  useEffect(()=>{
    let getChefData = async () => {
      const profileRes = await axios.get("http://localhost:5000/chefs/5ed56b9518d80a39549ae5d3")
      setChefProfile({...profileRes.data})
      setChefService([...profileRes.data.profile.services])
      setChefProfile({...profileRes.data, _id:profileRes.data._id})
      if (!profileRes.data.profile.profilePicture) {
        setChefProfile({...profileRes.data, profile: {profilePicture: "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}}
        )
      }
    }
    getChefData()
  },[])

  chefService.forEach((el) => {el.firstName = chefProfile.firstName})

  // Input Handlers

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
    <EditChefProfileContext.Provider value={[chefProfile, setChefProfile]}>
    <EditChefServiceContext.Provider value={[chefService, setChefService]}>
      <div className="background">
        <div className="chef-profile">
          <div className="profile-header">
            <div className="profile-header-text-container">
              <div className="profile-name">
                {chefProfile?.firstName} {chefProfile?.lastName}
              </div>
              <LocationSelector></LocationSelector>
              <div>
                <textarea value={chefProfile?.profile.bio} className="profile-bio-edit" maxLength="200" cols="50" rows="4" placeholder="Brief description of yourself and your skills." onChange={(e)=>{chefBioInputHandler(e)}}>
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
    </EditChefServiceContext.Provider>
    </EditChefProfileContext.Provider>

  )
}

export default EditChefProfilePage