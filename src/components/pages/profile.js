import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

import ServiceListContainer from "../serviceListContainer"
import EditServiceListContainer from "../editServiceListContainer"
import NewServiceCardContainer from "../newServiceCardContainer"
import LocationSelector from "../locationSelector"

import UserDataContext from "../../context/UserDataContext"
import Axios from "axios"
export const ServiceContext = React.createContext()
export const ProfileContext = React.createContext()
export const NewServiceContext = React.createContext()

const Profile = () => {
  const [profile, setProfile] = useState()
  const [service, setService] = useState([])
  const [newService, setNewService] = useState({})
  const { userData } = useContext(UserDataContext)

  const { id } = useParams()

  const isChef = userData.user?._id === id

  useEffect(() => {
    let getChefProfile = async () => {
      const profileRes = await axios.get(`http://localhost:5000/profile/${id}`)
      setProfile(profileRes.data)
      setService([...profileRes.data.profile.services])
      if (profileRes.data.profile.profilePicture === "not set") {
        profileRes.data.profile.profilePicture =
          "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      }
    }
    getChefProfile()
  }, [])

  service.forEach((el) => {
    el.profileId = profile.profile._id
    el.firstName = profile.firstName
  })

  const chefProfileID = profile?.profile._id

  // edit chef profile input handlers

  const chefBioInputHandler = (e) => {
    let cloneProfile = {
      ...profile,
      profile: { ...profile.profile, bio: e.target.value },
    }
    setProfile(cloneProfile)
  }

  // save and update database with bio

  const saveBioButton = async () => {
    let profileID = profile.profile._id
    let update = {
      bio: profile.profile.bio,
      locationCity: profile.profile.locationCity,
      locationState: profile.profile.locationState,
      zipCode: profile.profile.zipCode,
      lat: profile.profile.lat,
      lng: profile.profile.lng,
      profilePicture: profile.profile.profilePicture,
    }
    await Axios.patch(
      `http://localhost:5000/profile/update/${profileID}`,
      update
    )
  }

  // create new service

  const isNewServ = newService.title !== undefined

  const createNewServiceButtonHandler = () => {
    let newServ = {
      title: "",
      description: "",
      serviceType: ""
    }
    setNewService(newServ)
  }

  // save new service

  const saveNewServiceButtonHandler = async () => {
    const savedServ = await axios.post(
      "http://localhost:5000/services",
      newService
    )
    let newServ = {
      _id: savedServ.data._id,
    }
    await axios.post(
      `http://localhost:5000/profile/services/${chefProfileID}`,
      newServ
    )
    let cloneService = service.concat(newService)
    setService(cloneService)
    setNewService({})
  }

  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      <ServiceContext.Provider value={[service, setService]}>
        {isChef ? (
          <>
            <div className="background">
              <div className="chef-profile">
                <div className="profile-header">
                  <div className="profile-header-text-container">
                    <div className="profile-name">
                      {profile?.firstName} {profile?.lastName}
                    </div>
                    <LocationSelector></LocationSelector>
                    <div>
                      <textarea
                        defaultValue={profile?.profile.bio}
                        className="profile-bio-edit"
                        maxLength="200"
                        cols="50"
                        rows="4"
                        placeholder="Brief description of yourself and your skills."
                        onChange={(e) => {
                          chefBioInputHandler(e)
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <img
                      className="profile-chef-picture"
                      src={profile?.profile.profilePicture}
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
              <div className="chef-profile-edit-tools">
                <button onClick={saveBioButton} className="edit-profile-button">
                  Save Profile
                </button>
              </div>
              <div className="chef-services">
                <EditServiceListContainer></EditServiceListContainer>
              </div>

              {isNewServ ? (
                <NewServiceContext.Provider
                  value={{ newService, setNewService }}
                >
                  <div className="chef-services">
                    <NewServiceCardContainer></NewServiceCardContainer>
                  </div>
                </NewServiceContext.Provider>
              ) : (
                <> </>
              )}

              <div className="chef-service-edit-tools">
                <button
                  onClick={createNewServiceButtonHandler}
                  className="edit-service-button"
                >
                  Create New Service
                </button>
                <button
                  onClick={saveNewServiceButtonHandler}
                  className="edit-service-button"
                >
                  Save Service
                </button>
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
                      {profile?.firstName} {profile?.lastName}
                    </div>
                    <div className="profile-location">
                      {profile?.profile.locationCity},{" "}
                      {profile?.profile.locationState}
                    </div>
                    <div className="profile-bio">{profile?.profile.bio}</div>
                  </div>
                  <div>
                    <img
                      className="profile-chef-picture"
                      src={profile?.profile.profilePicture}
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
              <div className="chef-services">
                <ServiceListContainer></ServiceListContainer>
              </div>
            </div>
          </>
        )}
      </ServiceContext.Provider>
    </ProfileContext.Provider>
  )
}

export default Profile
