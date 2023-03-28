import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

function NoteItem(props) {
    const context = useContext(noteContext)
    const {deleteNote } = context
    const { note, updateNote } = props
    return (
        <>
            <div className="col-lg-4 col-sm-6">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title"><strong>Title:-</strong> {note.title}</h5>
                        <p className="card-text mb-2"><strong>Description:-</strong> {note.description}</p>
                        <p className="card-text mb-2"><strong>Tag:-</strong> {note.tag}</p>
                        <button className='btn btn-danger mt-3 me-3' onClick={()=>{deleteNote(note._id);props.showAlert('Notes Deleted Successfully','success')}}><i className="fa-solid fa-trash-can"></i></button>
                        <button className='btn btn-success mt-3' onClick={()=>{updateNote(note)}}><i className="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default NoteItem