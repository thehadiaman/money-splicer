import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import WelcomePage from './components/welcome-page';
import { auth } from './firebase/setup';
import EmailNotVerified from './components/email-not-verified';
import { User, onAuthStateChanged } from 'firebase/auth';
import LoadingPage from './components/loading';

function App() {

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [isLoaded, setLoaded] = useState(false);
  

  useEffect(()=>{
    onAuthStateChanged(auth, function(user: SetStateAction<User | null>) {
      if (user) {
        setCurrentUser(user);
      }else{
        setCurrentUser(null);
      }
      setLoaded(true);
    });
  }, []);


  if(!isLoaded)
    return <LoadingPage/>

  if(!currentUser)
    return (
      <WelcomePage {...{setCurrentUser, currentUser}}/>
    );
  else if(!currentUser.emailVerified)
      return (
        <EmailNotVerified {...{currentUser}}/>
      );
  else{
    return <h1>{currentUser.email}</h1>
  }
}

export default App;
