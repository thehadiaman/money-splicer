import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import WelcomePage from './components/welcome-page';
import { auth } from './firebase/setup';
import EmailNotVerified from './components/email-not-verified';
import { User, onAuthStateChanged } from 'firebase/auth';
import LoadingPage from './components/loading';
import { getCurrentUserDetails } from './firebase/services/account/account.service';
import SnackBar from './components/common/snackbar';
import { IPopupModel, popupModel } from './common/constants/models';
import LoggedInPage from './components/logged-in-page';

function App() {

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [popupMessage, setPopupMessage] = useState(popupModel);

  function handleError(errorModel: IPopupModel){
    setPopupMessage(errorModel);
    setTimeout(() => {
      popupModel['title'] = '';
      popupModel['message'] = '';
      popupModel['color'] = 'info';
      setPopupMessage(JSON.parse(JSON.stringify(popupModel)));
    }, 4000);
  }
  

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
      <div>
        <SnackBar errorTitle={popupMessage.title} errorMessage={popupMessage.message} color={popupMessage.color}/>
        <WelcomePage {...{setCurrentUser, currentUser, handleError}}/>
      </div>
    );
  else if(!currentUser.emailVerified && currentUserDetails)
      return (
        <div>
          <SnackBar errorTitle={popupMessage.title} errorMessage={popupMessage.message} color={popupMessage.color}/>
          <EmailNotVerified {...{currentUser, currentUserDetails, handleError}}/>
        </div>
      );
  else{
    return(
      <div>
        <LoggedInPage {...{currentUser, currentUserDetails, handleError}} />
        <SnackBar errorTitle={popupMessage.title} errorMessage={popupMessage.message} color={popupMessage.color}/>
      </div>
    )
  }
}

export default App;
