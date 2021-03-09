import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preview from './Preview'
import './App.css';
import WebCapture from './WebCapture';
import Chat from './Chat';
import ChatView from './ChatView';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counterSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
   if(authUser){
    dispatch(login({
      username:authUser.displayName,
      imageURL:authUser.photoURL,
      id:authUser.uid
    }))
   }else{
     dispatch(logout())
   }
  })
  },[])
  return (
    <div className="App">
      <Router>
       {!user ? (
         <Login/>
       ):(
         <>
         <img src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" className="app_image"/>
        <div className="app__body">
          <div className="app__bodyBackground">
          <Switch>
        <Route path="/chat/view">
            <ChatView/>
          </Route>
          <Route path="/chat">
            <Chat/>
          </Route>
          <Route path="/preview">
            <Preview/>
          </Route>
          <Route exact path="/">
          <WebCapture/>
          </Route>
        </Switch>
          </div>
      </div>
      </>
       )}
      </Router>
    </div>
  );
}

export default App;
