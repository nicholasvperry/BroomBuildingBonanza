import React, {useState, createContext} from "react"


// The context is imported and used by individual components that need data
//TailTypeContext stores date used in application
export const TailTypeContext = createContext()

// This component allows other components to use the context data
export const TailTypesProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [tailTypes, setTailType] = useState([])

   
    const getTailTypes = () => {
        return fetch("http://localhost:8088/tailtypes")
        .then(res => res.json())
        .then(setTailType)
    }

    const addTailType = tailTypeObj => {
        return fetch("http://localhost:8088/tailtypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tailTypeObj)
        })
        .then(getTailTypes)
    }

    const getTailTypeById = (id) => {
        return fetch(`http://localhost:8088/tailtypes/${id}`)
            .then(res => res.json())
    }

    const updateTailType = tailtype => {
        return fetch(`http://localhost:8088/tailtypes/${tailtype.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tailtype)
        })
          .then(getTailTypes)
      }
      
      const deleteTailType = tailtypeId => {
        return fetch(`http://localhost:8088/tailtypes/${tailtypeId}`, {
            method: "DELETE"
        })
            .then(getTailTypes)
    }

    const [ searchTerms, setSearchTerms ] = useState("")
    /*
        You return a context provider which has the
        `TailTypes` state, `getTailTypes` function,
        and the `addTailTypes` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TailTypeContext.Provider value={{
            tailTypes, getTailTypes, addTailType, getTailTypeById, updateTailType, deleteTailType, searchTerms, setSearchTerms
        }}>
            {props.children}
        </TailTypeContext.Provider>
    )
}