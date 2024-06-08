import React from 'react'
import { GoogleOutlined} from '@ant-design/icons';
import {auth} from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth';
const Login = () => {
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
      signInWithRedirect(auth, googleProvider);
    };
  return (
    <div id="login-page">
        <div id="login-card">
            <h2>Welcome To UniChat!</h2>

            <div
                className="login-button google"
                onClick={handleGoogleSignIn}
            >
                <GoogleOutlined /> Sign In with Google
            </div>
            <br /><br />
            {/* <div
                className="login-button facebook"
            >
                <FacebookOutlined /> Sign In with Facebook
            </div> */}
        </div>
    </div>
  );
}

export default Login