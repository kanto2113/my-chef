import React, { useContext } from "react"
import EditChefServiceCardContainer from "./editChefServiceCardContainer"
import { EditChefServiceContext } from "./pages/edit-chef-profile-page"


const EditChefServiceListContainer = () => {

  const [ chefService, setChefService ] = useContext(EditChefServiceContext)

  return (
    <div className="chef-service-list">
      {chefService.map((service) => {
        return(
          <EditChefServiceCardContainer key={service.title} service={service} />
        )
      })}
    </div>
  )

}

export default EditChefServiceListContainer