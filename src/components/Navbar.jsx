import React, {useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'



const Navbar = () => {
    let location = useLocation();
    const nevigate = useNavigate()

    useEffect(() => {
        // Google Analytics
      console.log(location.pathname)
    }, [location]);
    const logOutHandel = () => {
        localStorage.removeItem('token')
        nevigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">i Notebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/contact"? "active" : ""}`} to="/contact">Content</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/blog"? "active" : ""}`} to="/blog">Blog</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')? <div className="d-flex">
                            <Link to='/login' className="btn btn-outline-primary text-white me-3" type="submit">Log In</Link>
                            <Link to='/signup' className="btn btn-outline-primary text-white" type="submit">Sign In</Link>
                        </div>:<button className='btn btn-primary text-white' onClick={logOutHandel}>Log Out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
