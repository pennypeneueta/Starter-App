import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLoading} from '@ionic/react';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from '../toast';
import { registerUser } from '../firebaseConfig'
import './Login.css';


const Register: React.FC = () => {

 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [cpassword, setCPassword] = useState('')

 const [busy, setBusy] = useState<boolean>(false)
 
async function register(){
   
   setBusy(true)

  //Validate input
  if(password !== cpassword){
      return toast('Passwords do not match')
  }
  if(username.trim() === '' || password.trim() === ''){
      return toast('Username and password are required')
  }

  const res = await registerUser(username, password)

  if(res){
      toast('You have registered successfully')
  } 
  setBusy(false)
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonLoading message="Registration in progress..." duration={0} isOpen={busy}/>
        <IonInput placeholder="Username"
        onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>  
        
        <IonInput 
        type="password"
        placeholder="Password"
        onIonChange={(e: any) => setPassword(e.target.value)}></IonInput> 

        <IonInput 
        type="password"
        placeholder="Confirm Password"
        onIonChange={(e: any) => setCPassword(e.target.value)}></IonInput> 

        <IonButton onClick={register}>Register</IonButton>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
