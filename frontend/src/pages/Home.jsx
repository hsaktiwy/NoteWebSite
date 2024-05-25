import { useState, useEffect } from "react"
import ola from "../api"
import Note from '../components/Note'
import '../styles/Home.css'
function Home()
{
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(
        () =>
        {
            getNotes();
        }, []
    )
    const getNotes = () => {
        ola.get("/api/notes/")
        .then((res) => (res.data))
        .then((data) => { setNotes(data); console.log(data) })
        .catch((err) =>alert(err));
    }

    const deleteNote = (id) =>
    {
        ola
        .delete(`/api/notes/delete/${id}/`)
        .then((res) =>
        {
            if (res.status === 204)
                alert("Note deleted")
            else
                alert("Failed to delete note.")  
            getNotes();
        }).catch((error) => alert(error));
    }

    const createNote = (e) =>
    {
        e.preventDefault()
        console.log(title)
        console.log(content)
        ola.post("/api/notes/", {content, title})
        .then((res) => {
            if (res.status === 201)
                alert("Note created!");
            else
                alert("Failed to make note.")
            getNotes();
        }).catch((err) => alert(err));
    }

    return (
        <div>
            <div>
                <h2>Notes</h2>
                { notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <div>
                <h2>Create Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br/>
                    <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                     <label htmlFor="title">Content:</label>
                    <br/>
                    <textarea id="content" name="content" required onChange={(e) => setContent(e.target.value)}
                        value={content}
                    ></textarea>
                    <input type="submit" value="Submit"
                    />
                </form>
            </div>
        </div>
    )
}

export default Home