import React from "react"

const ChefCardContainer = (props) => {

  return (

    <div className="chef-card-container">
      <div className="chef-card-header">
        <img src={props.chef.profilePicture} alt="chef profile" className="chef-card-profile-picture"></img>
        <div className="chef-card-name">
          {props.chef.name}
        </div>
      </div>
      <div className="chef-card-bio">
        {props.chef.bio}
      </div>
      <div className="chef-card-services">
        Meals starting at ${props.chef.services} each.
      </div>
    </div>
  )


}

export default ChefCardContainer