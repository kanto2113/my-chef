import React, { useContext } from "react"
import { NewServiceContext } from "./pages/profile"

const NewServiceCardContainer = () => {
  const { newService, setNewService } = useContext(NewServiceContext)

  console.log('newService', newService)

  const deleteServiceButton = () => {
    setNewService({})
  }

  const serviceTitleInputHandler = (e) => {
    let cloneNewService = { ...newService, title: e.target.value }
    setNewService(cloneNewService)
  }

  const serviceDescriptionInputHandler = (e) => {
    let cloneNewService = { ...newService, description: e.target.value }
    setNewService(cloneNewService)
  }

  const mealCheckboxHandler = () => {
    if(document.getElementById("meal").checked){
      let cloneNewService = {...newService, serviceType: "meal"}
      setNewService(cloneNewService)
      document.getElementById("grocery").checked = false
    }else{}
  }
  

  const groceryCheckboxHandler = () => {
    if(document.getElementById("grocery").checked){
      let cloneNewService = {...newService, serviceType: "grocery"}
      setNewService(cloneNewService)
      document.getElementById("meal").checked = false
    }else{
    }
  }

  return (
    <div className="service-list">
      <div className="service-container">
        <div className="service-header">
          <div className="service-delete">
            <button onClick={deleteServiceButton}>X</button>
          </div>
          <div className="service-title">
            <input
              onChange={(e) => {
                serviceTitleInputHandler(e)
              }}
              value={newService.title}
              placeholder="Name of Service"
              className="service-title-input"
            ></input>
          </div>
        </div>
        <div>
          <textarea
            onChange={(e) => {
              serviceDescriptionInputHandler(e)
            }}
            defaultValue={newService?.description}
            className="service-description-textarea"
            maxLength="200"
            cols="40"
            rows="5"
            placeholder="A breif description of the service."
          ></textarea>
        </div>
        <div className="service-footer">
            <div>
              Prepared Food <input onChange={mealCheckboxHandler} type="checkbox" id="meal"></input> 
            </div>
            <div>
              Grocery Service <input onChange={groceryCheckboxHandler} type="checkbox" id="grocery"></input>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NewServiceCardContainer
