import React from "react"

const ServiceCardContainer = (props) => {
  return (
    <div className="service-container">
      <div className="service-title">{props.service.title}</div>
      <div className="service-description">{props.service.description}</div>
      <div className="service-footer">
        <div className="service-footer">
          <div className="service-cost">${props.service.cost}</div>
          <div>&nbsp;per meal.</div>
        </div>
        <div className="service-purchase-button">
          <button>Hire {props.service.firstName}</button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCardContainer
