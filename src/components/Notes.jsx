import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

function Notes(props) {
    const context = useContext(noteContext);
    const nevigate = useNavigate()
    
    const { notes, getNotes, editNote } = context;
    
    useEffect(() => {
        if(localStorage.key('token') !== null){
            getNotes()
            console.log(localStorage.getItem('token'));
            console.log('token is not null');
        }else{
            nevigate('/login')
            console.log(localStorage.getItem('token'));
            console.log('token is null');
        }
        // editNote()
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag: ""});
    const updateNote = (currentNote) => {
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
        ref.current.click();
    };
    const SubmitForm = (e) => {
        e.preventDefault();
        editNote({id:note.id,title:note.etitle, description:note.edescription, tag:note.etag })
        refClose.current.click();
        props.showAlert('Updated Successfully','success')
    };
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value});
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <hr />

            <button type="button" className="btn btn-danger d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#editModal">
                loader is ready
            </button>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-4'>
                                <div className="mb-3">
                                    <label htmlFor="eTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" minLength={5} required id="eTitle" value={note.etitle} name='etitle' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} name='edescription' minLength={5} required id="eDesc" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eTag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} name='etag' minLength={5} required id="eTag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length <5 || note.edescription.length <5 || note.etag.length < 4} onClick={SubmitForm}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='text-center mt-5 mb-4'>Your Notes</h2>
            <div className="row mb-4 g-4 ">
                <div className="col-12">
                    <h3 className='text-center'>
                        {notes.length === 0 && '**** No Notes to Display ****'}
                    </h3>
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} showAlert={props.showAlert} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes