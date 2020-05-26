import React, { useState } from "react"
import ChefListContainer from "../chefListContainer"
import ChefListFilter from "../chefListFitler"

export const ChefListContext = React.createContext()

const Home = () => {

    const [ chefList, setChefList ] = useState([])

    return (
        <ChefListContext.Provider value={[chefList, setChefList]}>
            <div className="banner-text">
                <div className="banner-image">
                </div>
                <br></br>
                Find a local chef to do your grocery shopping and bring you pre-made meals.
            </div>
            <div>
                <ChefListFilter></ChefListFilter>
            </div>
            <div>
                <ChefListContainer></ChefListContainer>
            </div>
        </ChefListContext.Provider>
    )
}

export default Home