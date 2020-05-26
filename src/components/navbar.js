import React from "react"
import AuthOptions from "./auth/authOptions"

const Navbar = () => {

    const hamburgerIconHandler = () => {
			let menuItems = Array.from(document.getElementsByClassName("item"))

			console.log(menuItems)
			menuItems.forEach(e => {
				if(Array.from(e.classList).includes("active")){
					e.classList.remove("active")
				}else{
					e.classList.add("active")
				}
			})
		}

    return (
        <nav>
            <ul className="menu">
                <img className="icon" src="https://i.imgur.com/17Y64el.png"/>
                <li className="logo"><a href="/">HiredKnife</a></li>
                <li className="item"><a href="/">Home</a></li>
                <li className="item"><a href="/registerchef">Create Chef Account</a></li>
                <li className="item"><AuthOptions></AuthOptions></li>
                <li className="toggle" onClick={hamburgerIconHandler}>
					<span className="bars"></span>
				</li>
            </ul>
        </nav>
    )
}

export default Navbar