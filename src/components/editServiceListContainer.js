import React, { useContext } from "react"
import EditServiceCardContainer from "./editServiceCardContainer"
import { ServiceContext } from "./pages/chef-profile-page"

const EditServiceListContainer = () => {
  const [service, setService] = useContext(ServiceContext)

  return (
    <div className="service-list">
      {service.map((service) => {
        return (
          <EditServiceCardContainer
            key={service.title}
            service={service}
            setService={setService}
          />
        )
      })}
    </div>
  )
}

export default EditServiceListContainer
