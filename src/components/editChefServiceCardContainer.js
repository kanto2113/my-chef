import React, { useContext } from "react"
import { ChefServiceContext } from "./pages/chef-profile-page"
import Axios from "axios"

const EditChefServiceCardContainer = (props) => {

  const [ chefService, setChefService] = useContext(ChefServiceContext)

  const deleteServiceButton = async () => {
    let cloneChefService = chefService.filter((service)=>{
        return service.title !== props.service.title
    })
    let serviceRes = await Axios.delete(`http://localhost:5000/services/delete/${props.service._id}`)
    console.log('serviceRes', serviceRes)
    let deletedService = serviceRes.data._id
    let profileRes = await Axios.post(`http://localhost:5000/profile/service_remove/${deletedService}`)
    setChefService(cloneChefService)
  }

  return (
    <div className="service-container">
      <div className="service-header">
        <div className="service-delete">
          <button onClick={deleteServiceButton}>X</button>
        </div>
        <div className="service-title">
          <input defaultValue={props.service.title} placeholder="Name of Service" className="service-title-input" ></input>
        </div>
      </div>
        <div>
          <textarea defaultValue={props.service.description} className="service-description-textarea" maxLength="200" cols="40" rows="5" placeholder="A breif description of the service."></textarea>
        </div>
        <div className="service-footer">
          <div className="service-footer">
            <div className="service-cost">
              $<input defaultValue={props.service.cost} className="service-cost-input" placeholder="0"></input>
            </div>
            <div>
              &nbsp;per meal.
            </div>
          </div>
      </div>
    </div>
  )
}

export default EditChefServiceCardContainer