import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from "../firebase";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "projectID": process.env.REACT_APP_CHAT_ENGINE_ID,
        "userName": user.email,
        "userSecret": user.uid,
      }
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {  
      let formdata = new FormData();  
      formdata.append('email', user.email);
      formdata.append('username', user.email);
      formdata.append('secret', user.uid);

      getFile(user.photURL)
        .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);
            for (let [key, value] of formdata.entries()) {
                console.log(key, value);
            }
            axios.post('https://api.chatengine.io/users',
                 formdata ,
                { headers: { 'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY}}
            )
            .then(()=> setLoading(false))
            .catch((error)=> console.log(error))
              
          });
    //   getFile(user.photoURL);
    //     if (avatar) {
    //       formdata.append('avatar',avatar, avatar.name);
    //     }
    //     console.log(avatar);
    //     // Log FormData content for debugging
    //    
    });
  }, [user, navigate]);

  if ( !user) {
    return 'Loading...';
  }

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          Unichat 
        </div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine 
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
