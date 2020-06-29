import React, { useContext } from "react"
import CardContainer from "./cardContainer"
import { ChefListContext } from "./pages/home"

const ChefListContainer = () => {
  const [chefList] = useContext(ChefListContext)

  return (
    <div className="list-container">
      {chefList.map((chef) => {
        return <CardContainer key={chef._id} chef={chef} />
      })}
    </div>
  )
}

export default ChefListContainer
