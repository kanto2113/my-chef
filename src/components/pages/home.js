import React, { useEffect, useState, useContext } from "react"
import ChefListContainer from "../chefListContainer"
import ChefListFilter from "../chefListFitler"
import axios from "axios"
import UserDataContext from "../../context/UserDataContext"

export const ChefListContext = React.createContext()

const Home = () => {
  const [chefList, setChefList] = useState([])
  const {userData} = useContext(UserDataContext)

  useEffect(() => {
    const getUserCards = async () => {
      const userCards = await axios.get("http://localhost:5000/users/cards")
      let cards = userCards.data
      console.log('cards', cards)
      cards.forEach((element)=>{
        if(element.profile.services.length === 0 ){
          let deletedCard = cards.indexOf(element)
          console.log('deletedCard', deletedCard)
          cards.splice(deletedCard)
        }})
      setChefList(cards)
    }
    getUserCards()
  }, [])


  return (
    <ChefListContext.Provider value={[chefList, setChefList]}>
      <div className="banner-text">
        <div className="banner-image"></div>
        <br></br>
        Find a local chef to do your grocery shopping and bring you pre-made
        meals.
      </div>
      <div>
        <ChefListFilter></ChefListFilter>
      </div>
      <div>
      </div>
      <div>
        <ChefListContainer></ChefListContainer>
      </div>
    </ChefListContext.Provider>
  )
}

export default Home

// else{
//   let dist = geodist(
//     {lat: userData.user?.profile.lat, lon: userData.user?.profile.lng},
//     {lat: element.profile.lat, lon: element.profile.lng})
//   if(dist >= 10){
//     let farAwayCards = cards.indexOf(element)
//     cards.splice(farAwayCards)
//   }
// }

  // const getDistance = () => {
  //   let dist = geodist({lat: userData.user?.profile.lat, lon: userData.user?.profile.lng},{lat: chefList[1]?.profile.lat, lon: chefList[1]?.profile.lng})
  //   console.log('dist', dist)
  // }
