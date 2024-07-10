import React, { useContext } from 'react'
import NoteContext from '../Context/noteContext'

const About = () => {
  const a=useContext(NoteContext);

  return (
    <div>
     <h1>this is {a.name} and age is {a.age}</h1> 
    </div>
  )
}

export default About
