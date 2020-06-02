import React from "react"

const EditChefServiceCardContainer = (props) => {

  return (
    <div className="chef-service-container">
      <div className="chef-service-title">
        <input placeholder="Name of Service" className="chef-service-title"></input>
      </div>
        <div>
          <textarea className="chef-service-description-textarea" maxLength="200" cols="40" rows="5" placeholder="A breif description of the service."></textarea>
        </div>
        <div className="chef-service-footer">
          <div className="chef-service-footer">
            <div className="chef-service-cost">
              $<input className="chef-service-cost-input" placeholder="0"></input>
            </div>
            <div>
              &nbsp;per meal.
            </div>
          </div>
          <div className="chef-service-purchase-button">
            <button>Hire {props.service.firstName}</button>
          </div>
      </div>
    </div>
  )
}

export default EditChefServiceCardContainer