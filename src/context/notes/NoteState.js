import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    

    // Get all Notes
    // Add note
    const getNotes = async () => {
        // url =
        const response = await fetch(`${host}/api/notes/fatchallnotes` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }); 
        const json = await response.json()
        setNotes(json)
    }

    // Add note
    const addNote = async (title, description, tag) => {

        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote` , {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        }); 

        const note = await response.json();
        setNotes (notes.concat(note))
    }
    // Delete note
    const deleteNote = async (id) => {
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)

        const response = await fetch(`${host}/api/notes/deletenote/${id}` , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }); 
        const json = await response.json();
        console.log(json);
    }

    // Edit note
    const editNote = async ({id, title, description, tag}) => {
        // API Call
        // url =
        const response = await fetch(`${host}/api/notes/updatenote/${id}` , {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        }); 
        // eslint-disable-next-line
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client 
        for (let i = 0; i < newNotes.length; i++) {
            const ele = newNotes[i];
            if(ele._id === id){
                newNotes[i].title = title
                newNotes[i].description = description
                newNotes[i].tag = tag
                break;
            }
        }
        setNotes(newNotes);
    }
    
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;