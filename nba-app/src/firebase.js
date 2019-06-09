import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyADg1Hp2cN1x5MnSR1SYgGhisTfn3Y_2pM",
    authDomain: "udemy-nba.firebaseapp.com",
    databaseURL: "https://udemy-nba.firebaseio.com",
    projectId: "udemy-nba",
    storageBucket: "udemy-nba.appspot.com",
    messagingSenderId: "954938347774",
    appId: "1:954938347774:web:37d08136ea8f0f0f"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();


  // Entering the references
  const firebaseArticles = firebaseDB.ref('articles');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebaseVideos = firebaseDB.ref('videos');

  const firebaseLooper = (snapshot) => {
      const data = [];
      snapshot.forEach((childrenSnapshot) => {
          data.push({
              ...childrenSnapshot.val(),
              id: childrenSnapshot.key
          })
      });
      return data
  }

  export {
      firebase,
      firebaseDB,
      firebaseArticles,
      firebaseTeams,
      firebaseVideos,
      firebaseLooper
  }