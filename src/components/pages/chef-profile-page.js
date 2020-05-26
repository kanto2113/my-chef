import React, { useState } from "react"
import ChefServiceListContainer from "../chefServiceListContainer"

export const ChefServiceContext = React.createContext()

const ChefProfilePage = () => {

  const [ chefService, setChefService ] = useState([
    {
      title: "Pre-Cooked Meals Delivered",
      description: "Choose from one of 5 delicious lunch or dinner options or 3 healty breakfasts.  Delivered to your doorstep when it is convenient for you.",
      addons: "Additional services available upon request.",
      cost: 15,
    },{
      title: "Fine Dining Quality Meals Delivered",
      description: "Choose from one of 3 top tier meals.  Treat yo' self!",
      addons: "Additional services available upon request.",
      cost: 25,
    },{
      title: "Personal Chef",
      description: "Choose from one of 3 top tier meals, cooked in your own kitchen live.",
      addons: "Additional services available upon request.",
      cost: 45,
    }
  ])

  // const [ chefProfile, setChefProfile ] = useState({
  //   id: '',
  //   name: '',
  //   profilePicture: '',
  //   bio: '',
  // })

  // useEffect(()=> {
  //   const getChefName = async () => {
  //     const chefNameRes = await axios.get("http://localhost:5000/chefs/")
  //     setChefProfile({...chefProfile, name: chefNameRes.data.name})
  //   }
  // })

  // useEffect(()=>{
  //   const getChefProfile = async () => {
  //     const chefRes = await axios.get("http://localhost:5000/profile/5ec30071aff85c0bc4b7522b")
  //     setChefProfile({...chefProfile, bio: chefRes.data.bio})
  //   }
  //   getChefProfile()
  // }, [])

  return (
    <ChefServiceContext.Provider value={[chefService, setChefService]}>
      <div className="background">
        <div className="chef-profile">
          <div className="profile-header">
            <div className="profile-header-text-container">
              <div className="profile-name">
                Butch Powers
              </div>
              <div className="profile-location">
                Berkeley, CA
              </div>
              <div className="profile-bio">
                I kick ass and chew bubblegum, and i'm all out of bubblegum.
              </div>
            </div>
            <div>
              <img className="profile-chef-picture" src="https://i.imgur.com/8HicAJg.png" alt=""></img>
            </div>
          </div>  
        </div>
        <div className="chef-services">
          <ChefServiceListContainer></ChefServiceListContainer>
        </div> 
      </div>
    </ChefServiceContext.Provider>

  )
}

export default ChefProfilePage