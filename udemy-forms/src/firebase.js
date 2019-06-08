import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBLPiKPbfqLgys0GbJa7_KqQAOZjphRZ_I",
    authDomain: "udemy-test-forms.firebaseapp.com",
    databaseURL: "https://udemy-test-forms.firebaseio.com",
    projectId: "udemy-test-forms",
    storageBucket: "udemy-test-forms.appspot.com",
    messagingSenderId: "199383928758",
    appId: "1:199383928758:web:fdd2be5bff106e34"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();

  const googleAuth = new firebase.auth.GoogleAuthProvider;

  // Exporting the constant outside
  export {
      firebase,
      firebaseDB,
      googleAuth
  }

//   firebaseDB.ref('users').orderByChild('lastname').equalTo('Zotov').once('value')
//   .then(
//       (snapshot) => {
//           const users = [];
//           snapshot.forEach((childSnapshot)=>{
//               users.push({
//                   id: childSnapshot.key,
//                   ...childSnapshot.val()
//               })
//           })
//         console.log(users);
//       }
//   )