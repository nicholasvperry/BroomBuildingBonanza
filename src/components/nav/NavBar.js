import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react/cjs/react.development"
import { UserContext } from "../Users/UserProvider"


export const NavBar = (props) => {
    //Get access to components needed
    const {users, getUsers} = useContext(UserContext)
    
    useEffect (() => {
        getUsers()
    }, [])

    if (localStorage.activeUserAdmin === "false") { 

    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Build Your Masterpiece</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders</Link>
                </li>                    
                <li className="nav-item">
                    <Link className="nav-link" to="/woodtype">Wood Type</Link>
                </li>                                      
            </ul>                
        </nav>
        )
    } else {
        return (
            <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Build Your Masterpiece</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Orders</Link>
                    </li>                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/woodtype">Wood Type</Link>
                    </li>                    
                    <li className="nav-item">
                        <Link className="nav-link hidden" to="/projects">Projects</Link>
                    </li>                    
                    <li className="nav-item">
                        <Link className="nav-link hidden" to="/products">Products</Link>
                    </li>                    
                </ul>                
            </nav>
            )
    }
    }
