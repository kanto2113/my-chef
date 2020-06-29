import React, { useEffect, useState, useContext } from "react"
import ChefListContainer from "../chefListContainer"
import ChefListFilter from "../chefListFitler"
import axios from "axios"
import UserDataContext from "../../context/UserDataContext"
var geodist = require('geodist')

export const ChefListContext = React.createContext()

const Home = () => {
  const [chefList, setChefList] = useState([])
<<<<<<< HEAD
  const {userData} = useContext(UserDataContext)
=======
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5

  useEffect(() => {
    const getUserCards = async () => {
      const userCards = await axios.get("http://localhost:5000/users/cards")
<<<<<<< HEAD
      let cards = userCards.data
      cards.forEach((element) => { 
        if(element.profile.services.length === 0){
          let deletedCards = cards.indexOf(element)
          cards.splice(deletedCards)
        }})
      setChefList(cards)
=======
      setChefList(userCards.data)
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
    }
    getUserCards()
  }, [])

<<<<<<< HEAD
  console.log('chefList', chefList)
  console.log('userData', userData)

  const getDistance = () => {
    let dist = geodist({lat: userData.user?.profile.lat, lon: userData.user?.profile.lng},{lat: chefList[1]?.profile.lat, lon: chefList[1]?.profile.lng})
    console.log('dist', dist)
  }

=======
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
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
<<<<<<< HEAD
        <button onClick={getDistance}>
          GPS
        </button>
      </div>
      <div>
=======
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
        <ChefListContainer></ChefListContainer>
      </div>
    </ChefListContext.Provider>
  )
}

export default Home
<<<<<<< HEAD


// else{
//   let dist = geodist(
//     {lat: userData.user?.profile.lat, lon: userData.user?.profile.lng},
//     {lat: element.profile.lat, lon: element.profile.lng})
//   if(dist >= 10){
//     let farAwayCards = cards.indexOf(element)
//     cards.splice(farAwayCards)
//   }
// }
=======
>>>>>>> 1f70ff5e820940883d2e5f2fa37e771bf53f63a5
