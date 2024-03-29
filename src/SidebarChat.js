import { Avatar } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import db from './firebase';
import { Link } from "react-router-dom";
import './SidebarChat.css'


function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState('');
    const [messages, setMassages] = useState("");

    useEffect(() => {
      if(id){
        db.collection('rooms').doc(id).collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
          setMassages(snapshot.docs.map((doc) =>
          doc.data()))
        )
      }
    }, [id]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Pleas enter name for chat room");
        if(roomName) {
          db.collection('rooms').add({
            name: roomName,
          })
        }
    }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
        
    </div>
  )
}

export default SidebarChat
