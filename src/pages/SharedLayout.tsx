import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const SharedLayout = () => {
    return <main>
        <Navbar />
        <Outlet />
        <Footer />
    </main>
}

export default SharedLayout