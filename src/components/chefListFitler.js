import React, { useContext } from "react"
import { ChefListContext } from "./pages/home"

const ChefListFilter = () => {
  const [chefList, setChefList] = useContext(ChefListContext)

  const priceLowToHigh = () => {
    let cloneChefList = [...chefList]
    cloneChefList.sort((chefA, chefB) => chefA.services - chefB.services)
    setChefList(cloneChefList)
  }

  const priceHighToLow = () => {
    let cloneChefList = [...chefList]
    cloneChefList.sort((chefA, chefB) => chefB.services - chefA.services)
    setChefList(cloneChefList)
  }

  return (
    <select id="sorting">
      <option id="sortBy" value="Sort By">
        Sort Chefs
      </option>
      <option
        id="priceLowToHigh"
        value="Price: Low to High"
        onClick={priceLowToHigh}
      >
        Price: Low to High
      </option>
      <option
        id="priceHightoLow"
        value="Price: High to Low"
        onClick={priceHighToLow}
      >
        Price: High to Low
      </option>
    </select>
  )
}

export default ChefListFilter
