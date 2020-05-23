import React, { useState } from "react"
import ChefListContainer from "../chefListContainer"
import ChefListFilter from "../chefListFitler"

export const ChefListContext = React.createContext()

const Home = () => {

    const [ chefList, setChefList ] = useState([
        {
            name: "Butch Powers",
            profilePicture: "https://i.imgur.com/8HicAJg.png",
            bio: "I kick ass and chew bubblegum, and i'm all out of bubblegum",
            services: 15,
        },{
            name: "Big Bob Johnson's name is really long man",
            profilePicture: "https://i.imgur.com/DJH3Snh.png",
            bio: "Shop smart. Shop S-Mart. You got that?",
            services: 12,
        },{
            name: "Karen Karens",
            profilePicture: "https://i.imgur.com/5UGNLjN.jpg",
            bio: "I need to speak with your manager.",
            services: 17,
        },{
            name:"Rick Roll",
            profilePicture: "https://i.imgur.com/mClCyA1.jpg",
            bio: "Never gonna give you up, never gonna let you down, never gonna run around and desert you.",
            services: 20,
        }
    ])

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