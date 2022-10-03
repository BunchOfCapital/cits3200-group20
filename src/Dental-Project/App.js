import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';
import {auth} from './firebase'

import * as firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


import { AppNavigator } from './components/navBar.component';
import { processColor } from 'react-native-reanimated';

// import { AppNavigator } from './components/navigation.component';


// export function App() {
//   const [fontsLoaded] = useFonts({
//     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//   });
// }

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


<<<<<<< HEAD
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const database = getDatabase(app);
=======
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
>>>>>>> c425a21d8e2d47e5f9528279291c2002e72bfbb9


export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
    
  </>
);