import React, { useContext } from "react"
import EditChefServiceCardContainer from "./editChefServiceCardContainer"
import { ChefServiceContext } from "./pages/chef-profile-page"


const EditChefServiceListContainer = () => {

  const [ chefService, setChefService ] = useContext(ChefServiceContext)

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