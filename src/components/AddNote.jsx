import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext';

function AddNote(props) {
    const context = useContext(noteContext)
    const {addNote } = context

    const [note, setNote] = useState({title:"", description:"", tag: ""})

    
    const SubmitForm = (e) => {
        e.preventDefault();
        if(note.title !== "" && note.tag !== "" && note.description !== ""){
            addNote(note.title, note.description, note.tag);
            props.showAlert('Note Added Successfully', 'success')
        }
        setNote({title:"", description:"", tag: ""});
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }
    
    return (
        <>
            <h1 className='mt-5'>Add Notes</h1>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-9">
                    <form className='my-4'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" name='description' id="desc" value={note.description} onChange={onChange} minLength={5} required /> 
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onChange} minLength={5} required /> 
                        </div>
                        <button type="submit" disabled={note.title.length <5 || note.description.length <5 || note.tag.length < 4} onClick={SubmitForm} className="btn btn-primary">Add Note</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNote