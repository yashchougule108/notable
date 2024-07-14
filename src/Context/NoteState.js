import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5001"
    // updating the note initial with the fetch api
    const notesInitial = []
    const[notes , setNotes ] = useState(notesInitial); 
   
    // Get All notes

    const getNotes= async ()=>{
        // api call  (bought from fetch api with header) to fetch all notes
        const response = await fetch(`https://notable-backend-phi.vercel.app/api/notes/fetchallnotes`,{
           mode:'cors',
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token') 
            },
          });
          const json = await response.json()
          // console.log(json)
          setNotes(json)
    }

      // the methods will be followed from here 

      // add note

        const addNote= async (title , description , tag)=>{
            // todo api call
            // api call  (bought from fetch api with header)
            const response = await fetch(`https://notable-backend-phi.vercel.app/api/notes/addnotes`, { mode: 'no-cors'},{
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
              });
              const note =  await response.json();
              setNotes(notes.concat(note))
        }
      // delete note
        const deleteNote= async (id)=>{
            // todo api call
            const response = await fetch(`https://notable-backend-phi.vercel.app/api/notes/deletenote/${id}`, { mode: 'no-cors'},{
              method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
              }
            });
            const json =  response.json(); // parses JSON response into native JavaScript objects
            // console.log(json);
            const newNote = notes.filter((note)=>{return note._id !== id});
            setNotes(newNote)
        } 
      
      // edit the note
        const editNote= async (id , title , description , tag)=>{
            // api call  (bought from fetch api with header)
            const response = await fetch(`https://notable-backend-phi.vercel.app/api/notes/updateNote/${id}`,{ mode: 'no-cors'}, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
              });
              const json = await response.json(); // parses JSON response into native JavaScript objects
              // console.log(json);
              let newNotes = JSON.parse(JSON.stringify(notes)); 
            // logic 
            for (let index = 0; index < notes.length; index++) {
                const element = newNotes[index];
                if(element._id === id){
                  newNotes[index].title = title;
                  newNotes[index].description = description;
                  newNotes[index].tag = tag;
                  break;
                }
            }
            setNotes(newNotes);
        }
      // with this we can update the notes too
     return(
        <NoteContext.Provider value = {{notes , addNote , deleteNote , editNote , getNotes }}>
            {props.children} 
        </NoteContext.Provider>
     )
}

export default NoteState;