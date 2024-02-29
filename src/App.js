import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import React, {useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {

  const [{}, dispatch] = useStateValue();
  // This is like a dynamic if statement in react
  // is used for refreshing
  useEffect(() => {
    onAuthStateChanged(auth, authUser=>{
      console.log('THE USER IS >>> ', authUser);
      
      if(authUser){
        // the user just lgoged in or it was logged in
        // its key because if you refresh the page it logs you in again automatically
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else{
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
    
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={[<Login/>]}/>
          <Route path="/checkout" element={[<Header/>,<Checkout/>]}/>
          <Route path="/" element={[<Header/>,<Home/>]}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
