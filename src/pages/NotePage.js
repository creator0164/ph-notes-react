import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

function NotePage({ match, history }) {
    let noteId = match.params.id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if (noteId === 'new') return

        let response = await fetch(`https://notes-ko.herokuapp.com/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
        if (noteId === 'new') return

        fetch(`https://notes-ko.herokuapp.com/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let createNote = async () => {
        fetch(`https://notes-ko.herokuapp.com/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`https://notes-ko.herokuapp.com/api/notes/${noteId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note != null) {
            createNote()
        }
        history.push('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {
                    noteId !== 'new' ? (
                        <button onClick={deleteNote}>DELETE</button>
                    ) : (
                        <button onClick={handleSubmit}>DONE</button>
                    )
                }


            </div>
            <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
