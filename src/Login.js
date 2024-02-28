import React from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useState } from 'react';
import { db, auth } from './firebase';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault()

        // firebase
    }
    
    const register = e => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password).then((auth) => {
            console.log("auth")
            console.log("User created successfully")
        }).catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <Link to='/'>
        <img className='login__image' src='https://ineo.fo/wp-content/uploads/2018/01/amazon-logo.png' alt=''></img> 
        </Link> 
        <div className='login__container'>
            <h1>Sign in</h1>
            <form>
                <h5>Email</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn} className='login__singin'>Sign in</button>
            </form>

            <p>By signing-in you agree to Amazon's Conditions of Use & Sale. Please 
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
            </p>
            <button onClick={register} className='login__register'>Create your amazon account</button>
        </div>
    </div>
  )
}

export default Login
