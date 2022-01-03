import React, {useState, createContext} from "react"



// The context is imported and used by individual components that need data
//WoodColorContext stores date used in application
export const WoodColorContext = createContext()

// This component allows other components to use the context data
export const WoodColorsProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [woodColors, setWoodColor] = useState([])

   
    const getWoodColors = () => {
        return fetch("http://localhost:8088/woodcolors")
        .then(res => res.json())
        .then(setWoodColor)
    }

    const addWoodColor = woodColorObj => {
        return fetch("http://localhost:8088/woodcolors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(woodColorObj)
        })
        .then(getWoodColors)
    }

    const getWoodColorById = (id) => {
        return fetch(`http://localhost:8088/woodcolors/${id}`)
            .then(res => res.json())
    }

    const updateWoodColor = woodColor => {
        return fetch(`http://localhost:8088/woodColors/${woodColor.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(woodColor)
        })
          .then(getWoodColors)
      }
      
      const deleteWoodColor = woodColorId => {
        return fetch(`http://localhost:8088/woodColors/${woodColorId}`, {
            method: "DELETE"
        })
            .then(getWoodColors)
    }

    const [ searchTerms, setSearchTerms ] = useState("")
    /*
        You return a context provider which has the
        `WoodColorypes` state, `getWoodColorTypes` function,
        and the `addWoodColorTypes` function as keys. This
        allows any child elements to access them.
    */
    return (
        <WoodColorContext.Provider value={{
            woodColors, getWoodColors, addWoodColor, getWoodColorById, updateWoodColor, deleteWoodColor, searchTerms, setSearchTerms
        }}>
            {props.children}
        </WoodColorContext.Provider>
    )
}