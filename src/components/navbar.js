import React from "react"

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
                <li className="logo"><a href="/">HomeCooked</a></li>
                <li className="item"><a href="/">Home</a></li>
                <li className="item"><a href="/about">About</a></li>
                <li className="item"><a href="/legal">Legal</a></li>
                <li className="item button"><a href="/login">Login</a></li>
                <li className="item button secondary"><a href="/register">Sign Up</a></li>
                <li className="toggle" onClick={hamburgerIconHandler}>
									<span className="bars"></span>
								</li>
            </ul>
        </nav>
    )
}

export default Navbar