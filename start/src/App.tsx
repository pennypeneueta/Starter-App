import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { getCurrentUser } from './firebaseConfig';
import { setUserState } from './redux/actions';
import { useDispatch } from 'react-redux';

const RoutingSystem: React.FC= () => {

  return (
  <IonReactRouter>
  <IonRouterOutlet>

    <Route path="/" component={Home} exact={true}/>
    <Route path="/login" component={Login} exact={true}/>
    <Route path="/register" component={Register} exact={true}/>
    <Route path="/welcome" component={Welcome} exact={true}/>

  </IonRouterOutlet>
</IonReactRouter>
  )
}

const App: React.FC = () => {

  const[busy, setBusy] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    getCurrentUser().then((user: any) => {
      console.log(user)
      if(user){
        //Logged in
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/welcome')
      } else {
        window.history.replaceState({}, '', '/')
      }
      setBusy(false)
    })
  }, [])
  
  return <IonApp>{busy ? <IonSpinner/> : <RoutingSystem/>} </IonApp>
}


export default App;
