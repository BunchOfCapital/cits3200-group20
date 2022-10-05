// import React from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
// import { default as theme } from './custom-theme.json';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import { useFonts } from 'expo-font';

// import WebBrowser from 'expo-web-browser'
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';
// import { Button } from 'react-native';

// import * as firebase from "firebase/app";
// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getDatabase } from "firebase/database";


// import { AppNavigator } from './components/navBar.component';

// // import { AppNavigator } from './components/navigation.component';


// // export function App() {
// //   const [fontsLoaded] = useFonts({
// //     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
// //   });
// // }

// const firebaseConfig = {
//   apiKey: "AIzaSyCP-sKoDDZ7Lt5fEsyEgK4pHPoH5WmaT50",
//   authDomain: "dentalapplication-11af7.firebaseapp.com",
//   databaseURL: "https://dentalapplication-11af7-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "dentalapplication-11af7",
//   storageBucket: "dentalapplication-11af7.appspot.com",
//   messagingSenderId: "839364181287",
//   appId: "1:839364181287:web:cca52feaca16d7dce67d02"
// };


// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const database = getDatabase(app);


// export default () => (
//   <>
//     <IconRegistry icons={EvaIconsPack} />
//     <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
//       <AppNavigator />
//     </ApplicationProvider>
//   </>
// );

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from "firebase/app";
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from "firebase/database";

// // Initialize Firebase
// initializeApp({
//   /* Config */

// });

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
      iosClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
      androidClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
      webClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
    },
  );


  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <TouchableHighlight style={{ paddingTop: 100 }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </TouchableHighlight>
  );
}


const firebaseConfig = {
  apiKey: "AIzaSyCP-sKoDDZ7Lt5fEsyEgK4pHPoH5WmaT50",
  authDomain: "dentalapplication-11af7.firebaseapp.com",
  databaseURL: "https://dentalapplication-11af7-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "dentalapplication-11af7",
  storageBucket: "dentalapplication-11af7.appspot.com",
  messagingSenderId: "839364181287",
  appId: "1:839364181287:web:cca52feaca16d7dce67d02",
  measurementId: "G-MKDS3KPF3N"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
