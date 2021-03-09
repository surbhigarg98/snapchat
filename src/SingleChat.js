import { Avatar } from '@material-ui/core'
import { StopRounded } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ReactTimeago from 'react-timeago'
import { selectImage, selectUser } from './features/counterSlice'
import { db } from './firebase'
import './SingleChat.css'

function SingleChat({id,imageUrl,imageURL,username,read,timestamp}) {
    const dispatch = useDispatch()
    const history  = useHistory()
    const user = useSelector(selectUser)
    const openImage=()=>{
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read:true
            },{merge:true})
            history.push('/chat/view')
        } 
    }
    return (
        <div onClick={openImage} className="singleChat">
            <Avatar src={imageURL} className="singleChat__avatar"/>
            <div className="singlechat__info">
                <h4>{username}</h4>
                <p>{!read && "Tap to view -"} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopRounded className="singlechat__stop"/>}
        </div>
    )
}

export default SingleChat
