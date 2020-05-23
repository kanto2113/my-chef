import React, { useContext } from "react"
import { ChefListContext } from "./pages/home"

const ChefListFilter = () => {

  const [ chefList, setChefList ] = useContext(ChefListContext)

  const selectionChange = () => {

  }

  return (
    <select id="sorting" onChange={selectionChange}>
      <option value="Sort By">Sort Chefs</option>
      <option value="Price: Low to High">Price: Low to High</option>
      <option value="Price: High to Low">Price: High to Low</option>
    </select>
  )
}

export default ChefListFilter
