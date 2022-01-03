import React, {useState, createContext} from "react"


// The context is imported and used by individual components that need data
//NoteContext stores date used in application
export const NoteContext = createContext()

// This component allows other components to use the context data
export const NotesProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [notes, setNote] = useState([])

   
    const getNotes = () => {
        return fetch("http://localhost:8088/notes")
        .then(res => res.json())
        .then(setNote)
    }

    const addNote = noteObj => {
        return fetch("http://localhost:8088/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteObj)
        })
        .then(getNotes)
    }

    const getNoteById = (id) => {
        return fetch(`http://localhost:8088/notes/${id}`)
            .then(res => res.json())
    }

    const updateNote = note => {
        return fetch(`http://localhost:8088/notes/${note.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(note)
        })
          .then(getNotes)
      }
      
      const deleteNote = noteId => {
        return fetch(`http://localhost:8088/notes/${noteId}`, {
            method: "DELETE"
        })
            .then(getNotes)
    }

    const [ searchTerms, setSearchTerms ] = useState("")
    /*
        You return a context provider which has the
        `notes` state, `getNotes` function,
        and the `addNotes` function as keys. This
        allows any child elements to access them.
    */
    return (
        <NoteContext.Provider value={{
            notes, getNotes, addNote, getNoteById, updateNote, deleteNote, searchTerms, setSearchTerms
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}