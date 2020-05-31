import React from "react"

const ChefServiceCardContainer = (props) => {

  return (
    <div className="chef-service-container">
      <div className="chef-service-title">
        {props.service.title}
      </div>
        <div className="chef-service-description">
          {props.service.description}
        </div>
        <div className="chef-service-footer">
          <div className="chef-service-footer">
            <div className="chef-service-cost">
              ${props.service.cost}
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

export default ChefServiceCardContainer