import React, { useContext } from "react"
import ChefCardContainer from "./chefCardContainer"
import { ChefListContext } from "./pages/home"


const ChefListContainer = () => {

  const [ chefList ] = useContext(ChefListContext)

  return (
    <div className="list-container">
      {chefList.map((chef) => {
        return(
          <ChefCardContainer key={chef.name} chef={chef} />
        )
      })}
    </div>
  )

}

export default ChefListContainer