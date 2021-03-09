import { Close, Create, TextFields,Note,MusicNote, AttachFile, Crop, Timer,Send } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {v4 as uuid} from 'uuid'
import {db, storage} from './firebase'
import firebase from 'firebase'
import './Preview.css'
import { selectUser } from './features/counterSlice'

function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory()
    const user =  useSelector(selectUser)
    const dispatch = useDispatch()
    useEffect(()=>{
      if(!cameraImage){
          history.replace('/')
      }
    },[cameraImage,history])
    const close=()=>{
       dispatch(resetCameraImage())
    }
    const sendimage =()=>{
        const id = uuid()
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage,"data_url")
        uploadTask.on('state_changed',null,(error)=>{
            console.log(error)
        },()=>{
            //after task complition
            storage.ref("posts")
            .child(id)
            .getDownloadURL()
            .then((url)=>{
                db.collection('posts').add({
                imageUrl : url,
                username:user.username,
                read:false,
                imageURL: user.imageURL,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
                })
                history.replace('/chat')
            })
        })
    }
    return (
        <div className="preview">
            <Close className="preview__close" onClick={close}/>
            <div className="preview__tools">
                <TextFields/>
                <Create/>
                <Note/>
                <MusicNote/>
                <AttachFile/>
                <Crop/>
                <Timer/>
            </div>
            <img src={cameraImage}/>
            <div className="preview__footer">
                <SendRoundedIcon onClick={sendimage} className="sendIcon"/>
            </div>
        </div>
    )
}

export default Preview
