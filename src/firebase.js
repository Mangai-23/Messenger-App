import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDdtruS3Y0VxOwcVIjFW9eHaqFEyytXleI",
    authDomain: "unichat-13346.firebaseapp.com",
    projectId: "unichat-13346",
    storageBucket: "unichat-13346.appspot.com",
    messagingSenderId: "906185470972",
    appId: "1:906185470972:web:22123db868fae3072a7879"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };