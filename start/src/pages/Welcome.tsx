import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebaseConfig';
import './Home.css';
import { useHistory } from 'react-router';

const Welcome: React.FC = () => {

  const [busy, setBusy] = useState(false)
  const history = useHistory();
  const username: any = useSelector((state: any) => state.user.username)

  async function logOut() {
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/login') 
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonLoading message="Logging out..." duration={0} isOpen={busy}/>

        <p><b>{username}'s</b> Dashboard</p>

        <IonButton onClick={logOut}>Log Out</IonButton>

      </IonContent>
    </IonPage>
  )
}

export default Welcome;
