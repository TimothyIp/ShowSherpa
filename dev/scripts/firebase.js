import firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDkoPKrzl4Q3B_ZxFdtlTviFgSECdyf-Lk",
    authDomain: "showsherpa-aa1d3.firebaseapp.com",
    databaseURL: "https://showsherpa-aa1d3.firebaseio.com",
    projectId: "showsherpa-aa1d3",
    storageBucket: "",
    messagingSenderId: "830320676551"
  };
  firebase.initializeApp(config);

  export default firebase;