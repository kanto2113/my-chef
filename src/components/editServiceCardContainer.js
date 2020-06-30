import React, { useContext } from "react"
import { ServiceContext } from "./pages/profile"
import Axios from "axios"

const EditServiceCardContainer = (props) => {
  const [service, setService] = useContext(ServiceContext)

  const deleteServiceButton = async () => {
    console.log("currentService", props.service)
    let cloneService = service.filter((service) => {
      return service._id !== props.service._id
    })
    let deletedService = props.service._id
    let updatedProfile = props.service.profileId
    await Axios.delete(
      `http://localhost:5000/services/delete/${deletedService}`
    )
    await Axios.post(
      `http://localhost:5000/profile/service_remove/${updatedProfile}`,
      {
        id: deletedService,
      }
    )
    setService(cloneService)
  }

  return (
    <div className="service-container">
      <div className="edit-service-header">
        <div className="edit-service-delete">
          <button onClick={deleteServiceButton}>X</button>
        </div>
        <div className="edit-service-title">{props.service.title}</div>
      </div>
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

export default EditServiceCardContainer
