//Changed navigate to welcome for splash screen
import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"


export const Login = (props) => {
    const email = useRef()
    // eslint-disable-next-line
    const password = useRef()
    const existDialog = useRef()
    const navigate = useNavigate() //now needs to be navigate and useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("activeUser", exists.id)
                    localStorage.setItem("activeEmail", exists.email)
                    localStorage.setItem("activeUserAdmin", exists.admin)
                    props.setLoggedin(true)
                    navigate("/welcome") // change to navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <div className="login">
            <dialog className="auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section className="loginPage">
                <form className="loginForm" onSubmit={handleLogin}>
                    <h1>Nearly Headless Nick's Broom Building Bonanza</h1>
                    
                    
                        <div htmlFor="inputEmail"> Email address </div>
                        <input ref={email} type="email"
                            id="email"
                            className="emailInput"
                            placeholder="Email address"
                            required autoFocus />
                    
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>

                    <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
                </form>
            </section>
            
        </div>
    )
}


