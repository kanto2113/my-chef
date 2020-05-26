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
        <div className="chef-service-addons">
          {props.service.addons}
        </div>
        <div className="chef-service-footer">
          <div className="chef-service-cost">
            ${props.service.cost} dollars per meal.
          </div>
          <div className="chef-service-purchase-button">
            <button>Hire Butch</button>
          </div>
      </div>
    </div>
  )
}

export default ChefServiceCardContainer