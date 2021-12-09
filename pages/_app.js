import { useEffect } from 'react';
import { serverTimestamp, collection, addDoc,setDoc,doc } from "firebase/firestore";
import {auth,db} from '../firebase';
import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);


  useEffect(() => {
    if(user){


      const docData = {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      };
      
      setDoc(doc(db, "users", user.uid), docData);

      /**       
        addDoc( collection(db, "users"), {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        });
       */
    }
  }, [user])
  
  if(loading) return <Loading/>;
  
  if(!user) return <Login/>;

  return <Component {...pageProps} />
}

export default MyApp
