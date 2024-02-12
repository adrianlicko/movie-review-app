import { NavLink } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
    return <header>
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to='/movies'>Movie reviews</NavLink>
        </nav>
    </header>
}

export default Navbar