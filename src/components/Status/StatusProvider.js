import React, {useState, createContext} from "react"


// The context is imported and used by individual components that need data
//TailTypeContext stores date used in application
export const StatusContext = createContext()

// This component allows other components to use the context data
export const StatusProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [status, setStatus] = useState([])

   
    const getStatus = () => {
        return fetch("http://localhost:8088/statuses")
        .then(res => res.json())
        .then(setStatus)
    }

    const addStatus = statusObj => {
        return fetch("http://localhost:8088/statuses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(statusObj)
        })
        .then(getStatus)
    }

    const getStatusById = (id) => {
        return fetch(`http://localhost:8088/statuses/${id}`)
            .then(res => res.json())
    }

    
    return (
        <StatusContext.Provider value={{
            status, getStatus, addStatus, getStatusById
        }}>
            {props.children}
        </StatusContext.Provider>
    )
}