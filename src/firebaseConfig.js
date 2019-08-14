import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCi9d5nTJVQB04tm0Xdznxj0QJ_-qxIRs0',
  authDomain: 'vuesns.firebaseapp.com',
  databaseURL: 'https://vuesns.firebaseio.com',
  projectId: 'vuesns',
  storageBucket: 'vuesns.appspot.com',
  messagingSenderId: '422961059851',
  appId: '1:422961059851:web:abef5d840bbadb49',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
