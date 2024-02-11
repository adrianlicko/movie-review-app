import { NavLink } from "react-router-dom"

const Navbar = () => {
    return <header>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to='/movies'>Movie reviews</NavLink>
        </nav>
    </header>
}

export default Navbar