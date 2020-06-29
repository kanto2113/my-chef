import React, { useContext } from "react"
import ServiceCardContainer from "./serviceCardContainer"
import { ServiceContext } from "./pages/profile"

const ServiceListContainer = () => {
  const [service] = useContext(ServiceContext)

  return (
    <div className="service-list">
      {service.map((service) => {
        return <ServiceCardContainer key={service.title} service={service} />
      })}
    </div>
  )
}

export default ServiceListContainer
