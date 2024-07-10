import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState=(props)=>{
    const Host="http://localhost:5001"
    const notesInitial=[];
const [notes, setnotes] = useState(notesInitial);

const getNotes= async ()=>{
    const response= await fetch(`${Host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
            'content-type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTU3MTQyYjQyNTBlMDc1ZTg2MzA3In0sImlhdCI6MTcyMDI3Njc1Nn0.-OGyg_-Caopcys6ycbLDaMcAmEV1U1pn8nVPfqSkbGA"
        }
    });
    const json= await response.json();
    setnotes(json);

}
const addNote= async (title,description,tag)=>{
    const response= await fetch(`${Host}/api/notes/addnotes`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTU3MTQyYjQyNTBlMDc1ZTg2MzA3In0sImlhdCI6MTcyMDI3Njc1Nn0.-OGyg_-Caopcys6ycbLDaMcAmEV1U1pn8nVPfqSkbGA"
        },
        body:JSON.stringify({title,description,tag})
    });
    const json= await response.json();
    setnotes(notes.concat(json))
}
const deleteNote= async (id)=>{
    const response= await fetch(`${Host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTU3MTQyYjQyNTBlMDc1ZTg2MzA3In0sImlhdCI6MTcyMDI3Njc1Nn0.-OGyg_-Caopcys6ycbLDaMcAmEV1U1pn8nVPfqSkbGA"
        },
        
    });
    const json=await response.json();
    console.log("deleted",json)
   const newnotes=notes.filter((note)=>{return note._id!==id});
   setnotes(newnotes);
}
const editNote= async (id,title,description,tag)=>{
    const response= await fetch(`${Host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTU3MTQyYjQyNTBlMDc1ZTg2MzA3In0sImlhdCI6MTcyMDI3Njc1Nn0.-OGyg_-Caopcys6ycbLDaMcAmEV1U1pn8nVPfqSkbGA"
        },
        body:JSON.stringify({title,description,tag})
        
    });
    for(let index=0;index<notes.length;index++){
        let element=notes[index];
        if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
        }

    }
}



    return(
        <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;