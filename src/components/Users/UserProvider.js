import React, {useState, createContext} from "react"


// The context is imported and used by individual components that need data
//UserContext stores date used in application
export const UserContext = createContext()

// This component allows other components to use the context data
export const UserProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [users, setUsers] = useState([])

   
    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(setUsers)
    }

    const addUser = userObj => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
        .then(getUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }

    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(getUsers)
      }
      
      const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    const [ searchTerms, setSearchTerms ] = useState("")
    /*
        You return a context provider which has the
        `Users` state, `getUsers` function,
        and the `addUsers` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserContext.Provider value={{
            users, getUsers, addUser, getUserById, updateUser, deleteUser, searchTerms, setSearchTerms
        }}>
            {props.children}
        </UserContext.Provider>
    )
}