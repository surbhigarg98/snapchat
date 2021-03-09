import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/counterSlice'
import { auth, provider } from './firebase'
import './Login.css'

function Login() {
    const dispatch = useDispatch()
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
          dispatch(login({
              username:result.user.displayName,
              imageURL:result.user.photoURL,
              id:result.user.uid
          }))  
        })
    }
    return (
        <div className="login">
          <div className="login__container">
          <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" className="login__img"/>
            <Button variant="outlined" onClick={signIn}>Sign In</Button>
           
          </div>
        </div>
    )
}

export default Login
