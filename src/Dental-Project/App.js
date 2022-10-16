import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


import { AppNavigator } from './components/navBar.component';


export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);

import { REACT_APP_FIREBASE_API_KEY, 
  REACT_APP_FIREBASE_AUTH_DOMAIN, 
  REACT_APP_FIREBASE_DATABASE_URL, 
  REACT_APP_FIREBASE_PROJECT_ID, 
  REACT_APP_FIREBASE_STORAGE_BUCKET, 
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID, 
  REACT_APP_FIREBASE_APP_ID} from '@env'


const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};

//const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from "firebase/app";
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from "firebase/database";


