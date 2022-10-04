import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';

import * as firebase from "firebase/app";
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from "firebase/database";


import { AppNavigator } from './components/navBar.component';

// import { AppNavigator } from './components/navigation.component';


// export function App() {
//   const [fontsLoaded] = useFonts({
//     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//   });
// }

const firebaseConfig = {
  apiKey: "AIzaSyCP-sKoDDZ7Lt5fEsyEgK4pHPoH5WmaT50",
  authDomain: "dentalapplication-11af7.firebaseapp.com",
  databaseURL: "https://dentalapplication-11af7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dentalapplication-11af7",
  storageBucket: "dentalapplication-11af7.appspot.com",
  messagingSenderId: "839364181287",
  appId: "1:839364181287:web:cca52feaca16d7dce67d02"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);


export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);