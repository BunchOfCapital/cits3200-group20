// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';
// import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { Button } from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// import * as firebase from "firebase/app";
// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getDatabase } from "firebase/database";

// WebBrowser.maybeCompleteAuthSession();

// export default GoogleAuthButton = () => {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
//     {
//       expoClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
//       iosClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
//       androidClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
//       webClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
//     },
//   );


//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const auth = getAuth();
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   return (
//     <TouchableHighlight style={{ paddingTop: 100 }}>
//       <Button
//         disabled={!request}
//         title="Login"
//         onPress={() => {
//           promptAsync();
//         }}
//       />
//     </TouchableHighlight>
//   );
// }

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCP-sKoDDZ7Lt5fEsyEgK4pHPoH5WmaT50",
// //   authDomain: "dentalapplication-11af7.firebaseapp.com",
// //   databaseURL: "https://dentalapplication-11af7-default-rtdb.asia-southeast1.firebasedatabase.app/",
// //   projectId: "dentalapplication-11af7",
// //   storageBucket: "dentalapplication-11af7.appspot.com",
// //   messagingSenderId: "839364181287",
// //   appId: "1:839364181287:web:cca52feaca16d7dce67d02",
// //   measurementId: "G-MKDS3KPF3N"
// // };

// // const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// // const database = getDatabase(app);
