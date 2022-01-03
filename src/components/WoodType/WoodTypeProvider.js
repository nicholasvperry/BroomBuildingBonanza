import React, {useState, createContext} from "react"


// The context is imported and used by individual components that need data
//WoodTypeContext stores date used in application
export const WoodTypeContext = createContext()

// This component allows other components to use the context data
export const WoodTypesProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [woodTypes, setWoodType] = useState([])

   
    const getWoodTypes = () => {
        return fetch("http://localhost:8088/woodtypes")
        .then(res => res.json())
        .then(setWoodType)
    }

    const addWoodType = woodTypeObj => {
        return fetch("http://localhost:8088/woodtypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(woodTypeObj)
        })
        .then(getWoodTypes)
    }

    const getWoodTypeById = (id) => {
        return fetch(`http://localhost:8088/woodtypes/${id}`)
            .then(res => res.json())
    }

    const updateWoodType = woodtype => {
        return fetch(`http://localhost:8088/woodtypes/${woodtype.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(woodtype)
        })
          .then(getWoodTypes)
      }
      
      const deleteWoodType = woodtypeId => {
        return fetch(`http://localhost:8088/woodtypes/${woodtypeId}`, {
            method: "DELETE"
        })
            .then(getWoodTypes)
    }

    const [ searchTerms, setSearchTerms ] = useState("")
    /*
        You return a context provider which has the
        `WoodTypes` state, `getWoodTypes` function,
        and the `addWoodTypes` function as keys. This
        allows any child elements to access them.
    */
    return (
        <WoodTypeContext.Provider value={{
            woodTypes, getWoodTypes, addWoodType, getWoodTypeById, updateWoodType, deleteWoodType, searchTerms, setSearchTerms
        }}>
            {props.children}
        </WoodTypeContext.Provider>
    )
}