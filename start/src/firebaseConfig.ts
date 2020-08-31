import * as firebase from 'firebase'
import {toast} from './toast'
import { error } from 'console'


const config = {
    apiKey: "AIzaSyCLjdrODSs5L1eMhqLXxs5xfOCXwohR8fw",
    authDomain: "starterapp-ed1e2.firebaseapp.com",
    databaseURL: "https://starterapp-ed1e2.firebaseio.com",
    projectId: "starterapp-ed1e2",
    storageBucket: "starterapp-ed1e2.appspot.com",
    messagingSenderId: "430195180790",
    appId: "1:430195180790:web:4df5acacaf4f967850d8d7",
    measurementId: "G-3ZQWXEG8FL"
}

firebase.initializeApp(config)

export function logoutUser() {
    return firebase.auth().signOut()
}

export function getCurrentUser() {

    return new Promise((resolve, reject) => {

        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){

            if (user){
                resolve(user)
            }
            else {
                resolve(null)
            }
            unsubscribe()
        })
    })

}

export async function loginUser(username: string, password: string){

//converts username into email to allow for firebase authentication
const email = `${username}@codedamn.com`

try{
    //if email and password are valid
    const res = await firebase.auth().signInWithEmailAndPassword(
        email, password)


    //user authenticated successfully
    return res

} catch (e) {
    //if email and password are invalid
    toast(e.message)
    //user will not be authenticated
    return false 
}
}

export async function registerUser(username: string, password: string){
   
    //converts username into email to allow for firebase authentication
    const email = `${username}@codedamn.com`

    try{
        const res = await firebase.auth().createUserWithEmailAndPassword
        (email, password)

        console.log(res)

        return true

    } catch(error){
        console.log(error)
        toast(error.message)
        return false
    }
}