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
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51Mu3hdDjKwlXRlnq6SYgfJVVV3vwjl2a1F1NGe4JMC7k7NC5GiwDCCQJgSFm6e8LglzoARQTWWEDhvCfC9O6engh00Fhj7Vp1l')

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
          <Route path="/orders" element={[<Header/>,<Orders/>]}/>
          <Route path="/checkout" element={[<Header/>,<Checkout/>]}/>
          <Route path="/payment" element={[<Header/>,<Elements stripe={promise}><Payment/></Elements>]}/>
          <Route path="/" element={[<Header/>,<Home/>]}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
