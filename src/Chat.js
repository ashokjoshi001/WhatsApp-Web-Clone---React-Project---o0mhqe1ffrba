
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React,{ useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import "./Chat.css";
import db from './firebase';
import { useStateValue } from './StateProvider';
import { serverTimestamp } from '@firebase/firestore'

function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMassages] = useState([]);
    const [{ user }, dispatch] = useStateValue();




    useEffect(() => {
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
          setRoomName(snapshot.data().name)
        ))

        db.collection('rooms').doc(roomId).collection('messages')
        .orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
          setMassages(snapshot.docs.map(doc => doc.data()))
        ))
      }
    }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) =>{
      e.preventDefault();
      // console.log("you typed >>> ", input);

      db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp(),

      })


      setInput("");
    }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()
            }
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p className={`chat__message ${message.name === user.displayName && 'chat__reciver'}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}  
      </div>
      <div className="chat__footer">
        <InsertEmoticon/>
        <form>
          <input type="text" value={input} 
          onChange={e => setInput(e.target.value)} placeholder='Type a message'/>
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <Mic/>
      </div>
    </div>
  )
}

export default Chat
