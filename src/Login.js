import React from 'react'
import './Login.css'
import { Button } from "@mui/material"
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () =>{
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
  return (
    <div className='login'>
        <div className="login__container">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Whatsapp_logo_svg.png/640px-Whatsapp_logo_svg.png"
                alt=''
            />
            <div className="login__text">
                <h1>Sign In to WhatsApp</h1>
            </div>

            <Button onClick={signIn}>Sign In With Google</Button>
        </div>
    </div>
  )
}

export default Login
