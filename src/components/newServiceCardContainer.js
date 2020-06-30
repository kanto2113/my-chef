import React, { useContext } from "react"
import { NewServiceContext } from "./pages/profile"

const NewServiceCardContainer = () => {
  const { newService, setNewService } = useContext(NewServiceContext)

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

  const serviceCostInputHandler = (e) => {
    let cloneNewService = { ...newService, cost: e.target.value }
    setNewService(cloneNewService)
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
          <div className="service-footer">
            <div className="service-cost">
              $
              <input
                onChange={(e) => {
                  serviceCostInputHandler(e)
                }}
                value={newService.cost}
                className="service-cost-input"
                placeholder="0"
              ></input>
            </div>
            <div>&nbsp;per meal.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewServiceCardContainer
