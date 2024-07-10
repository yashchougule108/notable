import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Notes = () => {
  const Context = useContext(NoteContext);
  const { notes, setnotes,getNotes } = Context;
  useEffect(()=>{
    getNotes();
  },[])
  return (
    <>
    <Addnote/>
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>;
      })}
    </div>
    </>
  );
};

export default Notes;
