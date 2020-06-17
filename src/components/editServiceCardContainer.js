import React, { useContext } from "react"
import { ServiceContext } from "./pages/chef-profile-page"
import Axios from "axios"

const EditServiceCardContainer = (props) => {
  const [service, setService] = useContext(ServiceContext)

  const deleteServiceButton = async () => {
    let cloneService = service.filter((service) => {
      return service._id !== props.service._id
    })
    let serviceRes = await Axios.delete(
      `http://localhost:5000/services/delete/${props.service._id}`
    )
    setService(cloneService)

    // let profileRes = await Axios.post(`http://localhost:5000/profile/service_update/${deletedService}`)
  }

  return (
    <div className="service-container">
      <div className="service-header">
        <div className="service-delete">
          <button onClick={deleteServiceButton}>X</button>
        </div>
        <div className="service-title">
          <input
            defaultValue={props.service.title}
            placeholder="Name of Service"
            className="service-title-input"
          ></input>
        </div>
      </div>
      <div>
        <textarea
          defaultValue={props.service.description}
          className="service-description-textarea"
          maxLength="200"
          cols="40"
          rows="5"
          placeholder="A breif description of the service."
        ></textarea>
      </div>
      <div className="service-footer">
        <div className="service-footer">
          <div className="service-cost">
            $
            <input
              defaultValue={props.service.cost}
              className="service-cost-input"
              placeholder="0"
            ></input>
          </div>
          <div>&nbsp;per meal.</div>
        </div>
      </div>
    </div>
  )
}

export default EditServiceCardContainer
