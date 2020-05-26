import React, { useContext } from "react"
import ChefServiceCardContainer from "./chefServiceCardContainer"
import { ChefServiceContext } from "./pages/chef-profile-page"


const ChefServiceListContainer = () => {

  const [ chefService, setChefService ] = useContext(ChefServiceContext)

  return (
    <div className="chef-service-list">
      {chefService.map((service) => {
        return(
          <ChefServiceCardContainer key={service.title} service={service} />
        )
      })}
    </div>
  )

}

export default ChefServiceListContainer