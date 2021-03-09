import { Avatar } from '@material-ui/core'
import { ChatBubble, RadioButtonUncheckedOutlined, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import './Chat.css'
import { resetCameraImage } from './features/cameraSlice'
import { selectUser } from './features/counterSlice'
import { auth, db } from './firebase'
import SingleChat from './SingleChat'

function Chat() {
    const [posts,setPosts] = useState([])
    const user = useSelector(selectUser)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
     db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot)=>setPosts(snapshot.docs.map((doc)=>({
         id:doc.id,
         data:doc.data()
     }))))
    },[])
    const takeSnap=()=>{
     history.push('/')
     dispatch(resetCameraImage())
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={user.imageURL} onClick={()=>auth.signOut()} className="chat_avatar"/>
                <div className="chatHeader__search">
                    <Search className="chatSearch__icon"/>
                    <input type="text" placeholder="Friends"/>
                </div>
                <ChatBubble className="chatBubbleIcon"/>
            </div>
            <div className="chat__box">
             {posts.map(({id,data})=>(
                 <SingleChat
                 key={id}
                 id={id}
                 imageUrl={data.imageUrl}
                 username={data.username}
                 imageURL={data.imageURL}
                 timestamp={data.timestamp}
                 read={data.read}/>
             ))}
            </div>
            <RadioButtonUncheckedOutlined 
            className="chatRadio__button"
            onClick={takeSnap}
            fontSize="large"/>
        </div>
    )
}

export default Chat
