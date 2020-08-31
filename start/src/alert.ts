export function presentAlert(message : string) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Welcome';
    alert.message = message;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  }