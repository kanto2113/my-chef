import React, { useContext } from "react"
import EditChefServiceCardContainer from "./editChefServiceCardContainer"
import { EditChefServiceContext } from "./pages/edit-chef-profile-page"


const EditChefServiceListContainer = () => {

  const [ chefService, setChefService ] = useContext(EditChefServiceContext)

  return (
    <div className="service-list">
      {chefService.map((service) => {
        return(
          <EditChefServiceCardContainer key={service.title} service={service} setChefService={setChefService} />
        )
      })}
    </div>
  )

}

export default EditChefServiceListContainer