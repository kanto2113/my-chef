import React from "react"

const ChefCardContainer = (props) => {
  const viewProfile = () => {
    console.log(props.chef)
    window.location = `/chefprofile/${props.chef._id}`
  }

  return (
    <div onClick={viewProfile} className="chef-card-container">
      <div className="chef-card-header">
        <img
          src={props.chef.profile.profilePicture}
          alt="chef profile"
          className="chef-card-profile-picture"
        ></img>
        <div className="chef-card-name">
          {props.chef.firstName} {props.chef.lastName}
        </div>
      </div>
      <div className="chef-card-bio">{props.chef.profile.bio}</div>
      <div className="chef-card-services">
        Meals starting at ${props.chef.profile.services[0]?.cost} each.
      </div>
    </div>
  )
}

export default ChefCardContainer
