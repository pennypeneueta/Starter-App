import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLoading} from '@ionic/react';
import React, {useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../firebaseConfig'
import { toast } from '../toast'
import { setUserState } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { presentAlert } from '../alert';
import './Login.css';

const Login: React.FC = () => {

 const [busy, setBusy] = useState<boolean>(false)
 const dispatch = useDispatch()
 const history = useHistory()
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 
async function login(){

 setBusy(true)

 const res: any = await loginUser(username, password)
 console.log(`${res ? 'Login Successful' : 'Login Failed'}`)

 if(res){
   dispatch(setUserState(res.user.email))
   history.replace('/welcome')
   toast('You are now logged in')
   var str1 = "Hello ";
   var str2 = username;
   var result = str1.concat(str2);
   presentAlert(result)
 }
 setBusy(false)
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}/>
      <IonContent className="ion-padding">
        <IonInput placeholder="Username"
        onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>  
        
        <IonInput 
        type="password"
        placeholder="Password"
        onIonChange={(e: any) => setPassword(e.target.value)}></IonInput> 

        <IonButton onClick={login}>Login</IonButton> 

        <p>Don't have an account yet? <Link to="/register">Sign Up!</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
