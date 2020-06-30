import React, { useState, useContext, useEffect } from "react"
import { ProfileContext } from "./pages/profile"

const LocationSelector = () => {
  const [details, setDetails] = useState(null)
  const [profile, setProfile] = useContext(ProfileContext)

  // get geolocation

  useEffect(() => {
    let x = document.getElementById("geo")
    const getUserGeolocationDetails = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        x.innerHTML = "Geolocation is not supported by this browser."
      }
    }
    const showPosition = (position) => {
      let coords = {
        lat: Number.parseFloat(position.coords.latitude).toFixed(4),
        lng: Number.parseFloat(position.coords.longitude).toFixed(4),
      }
      setDetails(coords)
    }
    getUserGeolocationDetails()
  }, [])

  // reverse geolocation

  const reverseGeocode = () => {
    let latitude = "latitude=" + details.lat
    let longitude = "&longitude=" + details.lng
    let query = latitude + longitude + "&localityLanguage=en"
    const Http = new XMLHttpRequest()
    let bigdatacloud_api =
      "https://api.bigdatacloud.net/data/reverse-geocode-client?"

    bigdatacloud_api += query

    Http.open("GET", bigdatacloud_api)
    Http.send()
    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let myObj = JSON.parse(this.responseText)
        console.log("response", myObj)
        let cloneProfile = {
          ...profile,
          profile: {
            ...profile.profile,
            locationCity: myObj.city,
            locationState: myObj.principalSubdivision,
            zipCode: myObj.postcode,
            lat: details.lat,
            lng: details.lng
          },
        }
        setProfile(cloneProfile)
      }
    }
  }

  // input location

  const editLocationCityInputHandler = (e) => {
    let cloneProfile = {
      ...profile,
      profile: { ...profile.profile, locationCity: e.target.value },
    }
    setProfile(cloneProfile)
  }

  const editZipCodeInputHandler = (e) => {
    let cloneProfile = {
      ...profile,
      profile: { ...profile.profile, zipCode: e.target.value },
    }
    setProfile(cloneProfile)
  }

  const editLocationStateSelectHandler = (e) => {
    let cloneProfile = {
      ...profile,
      profile: { ...profile.profile, locationState: e.target.value },
    }
    setProfile(cloneProfile)
  }

  return (
    <div id="geo">
      <button onClick={reverseGeocode}>Set Location</button>
      <br></br>
      <input
        className="profile-location-edit"
        id="cityInput"
        placeholder="locationCity"
        value={profile?.profile.locationCity || ""}
        onChange={(e) => {
          editLocationCityInputHandler(e)
        }}
      ></input>{" "}
      ,
      <select
        name="state"
        id="stateInput"
        className="profile-location-edit"
        value={profile?.profile.locationState}
        onChange={(e) => {
          editLocationStateSelectHandler(e)
        }}
      >
        <option>State</option>
        <option value="Alabama">Alabama</option>
        <option value="Alaska">Alaska</option>
        <option value="Arizona">Arizona</option>
        <option value="Arkansas">Arkansas</option>
        <option value="California">California</option>
        <option value="Colorado">Colorado</option>
        <option value="Connecticut">Connecticut</option>
        <option value="Delaware">Delaware</option>
        <option value="District Of Columbia">District Of Columbia</option>
        <option value="Florida">Florida</option>
        <option value="Georgia">Georgia</option>
        <option value="Hawaii">Hawaii</option>
        <option value="Idaho">Idaho</option>
        <option value="Illinois">Illinois</option>
        <option value="Indiana">Indiana</option>
        <option value="Iowa">Iowa</option>
        <option value="Kansas">Kansas</option>
        <option value="Kentucky">Kentucky</option>
        <option value="Louisiana">Louisiana</option>
        <option value="Maine">Maine</option>
        <option value="Maryland">Maryland</option>
        <option value="Massachusetts">Massachusetts</option>
        <option value="Michigan">Michigan</option>
        <option value="Minnesota">Minnesota</option>
        <option value="Mississippi">Mississippi</option>
        <option value="Missouri">Missouri</option>
        <option value="Montana">Montana</option>
        <option value="Nebraska">Nebraska</option>
        <option value="Nevada">Nevada</option>
        <option value="New Hampshire">New Hampshire</option>
        <option value="New Jersey">New Jersey</option>
        <option value="New Mexico">New Mexico</option>
        <option value="New York">New York</option>
        <option value="North Carolina">North Carolina</option>
        <option value="North Dakota">North Dakota</option>
        <option value="Ohio">Ohio</option>
        <option value="Oklahoma">Oklahoma</option>
        <option value="Oregon">Oregon</option>
        <option value="Pennsylvania">Pennsylvania</option>
        <option value="Rhode Island">Rhode Island</option>
        <option value="South Carolina">South Carolina</option>
        <option value="South Dakota">South Dakota</option>
        <option value="Tennessee">Tennessee</option>
        <option value="Texas">Texas</option>
        <option value="Utah">Utah</option>
        <option value="Vermont">Vermont</option>
        <option value="Virginia">Virginia</option>
        <option value="Washington">Washington</option>
        <option value="West Virginia">West Virginia</option>
        <option value="Wisconsin">Wisconsin</option>
        <option value="Wyoming">Wyoming</option>
      </select>
      <input
        id="zipCodeInput"
        className="profile-location-edit"
        placeholder="ZipCode"
        value={profile?.profile.zipCode}
        onChange={(e) => {
          editZipCodeInputHandler(e)
        }}
      ></input>
    </div>
  )
}

export default LocationSelector
