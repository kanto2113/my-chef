import React, { useContext } from "react"
import ServiceCardContainer from "./serviceCardContainer"
<<<<<<< HEAD
import { ServiceContext } from "./pages/profile"
=======
import { ServiceContext } from "./pages/chef-profile-page"
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5

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
