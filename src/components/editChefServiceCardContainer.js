import React, { useContext } from "react"
import { ChefServiceContext } from "./pages/chef-profile-page"

const EditChefServiceCardContainer = (props) => {

  const [ chefService, setChefService] = useContext(ChefServiceContext)

  const deleteServiceButton = () => {
    let cloneChefService = chefService.filter((service)=>{
        return service.title !== props.service.title
    })
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
          <div className="service-purchase-button">
            <button>Done</button>
          </div>
      </div>
    </div>
  )
}

export default EditChefServiceCardContainer