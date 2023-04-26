import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import WelcomePage from './components/welcome-page';
import { auth } from './firebase/setup';
import EmailNotVerified from './components/email-not-verified';
import { User, onAuthStateChanged } from 'firebase/auth';
import LoadingPage from './components/loading';
import { getCurrentUserDetails } from './firebase/services/account/account.service';

function App() {

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  

  useEffect(()=>{
    onAuthStateChanged(auth, async function(user: SetStateAction<User | null>) {
      if (user) {
        
        await setCurrentUser(user);
        getCurrentUserDetails(user, setCurrentUserDetails)
          
      }else{
        setCurrentUser(null);
      }
      setLoaded(true);
    });

  }, []);


  if(!isLoaded || (currentUser && !currentUserDetails))
    return <LoadingPage/>

  if(!currentUser)
    return (
      <WelcomePage {...{setCurrentUser, currentUser}}/>
    );
  else if(!currentUser.emailVerified && currentUserDetails)
      return (
        <EmailNotVerified {...{currentUser, currentUserDetails}}/>
      );
  else{
    return <h1>{currentUser.email}</h1>
  }
}

export default App;
