import React, { useContext } from "react"
import EditServiceCardContainer from "./editServiceCardContainer"
<<<<<<< HEAD
import { ServiceContext } from "./pages/profile"
=======
import { ServiceContext } from "./pages/chef-profile-page"
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5

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
