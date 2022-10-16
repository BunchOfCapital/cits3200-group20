import React, { useRef, useState, FC, ReactElement } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Alert, Image, StyleSheet, KeyboardAvoidingView, ScrollView, View, Parse } from 'react-native';
import { Button ,Input, Datepicker, Pressable} from '@ui-kitten/components';

import userData from '../Data/userData';
import profIcon from '../assets/profileIcon.png'
import profBanner from '../assets/profileBanner.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleAuthButton } from './GoogleAuth.component'
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import { GoogleIcon } from '../assets/GoogleIcon.png'
import { initializeApp, getApp, getApps } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';



import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { buildCodeAsync } from 'expo-auth-session/build/PKCE';
import { parse } from 'react-native-svg';
import { useEffect } from 'react/cjs/react.production.min';
import { async } from '@firebase/util';

WebBrowser.maybeCompleteAuthSession();



export const ProfilePage = () =>{
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("")
    const [location, setLocation] = React.useState("")
    const [boolDisabled, setDisability] = React.useState(true)
    const [date, setDate] = React.useState(new Date());
    const [visibility, setVisible] = React.useState(true)
    const [visibility1, setVisible1] = React.useState(true)

    const userID = useRef("0");

    const storeAsyncJSON = async (storage_key, value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(
              storage_key,
              jsonValue, // error
          );
          console.debug("beep boop writing " + value + " to "+ storage_key);
        } catch (error) {
              alert("Storage failed, returned error:\n " + error)
              return null;
        }
      };
  
      const getAsync = async (storage_key) => {
          try {
            const jsonvalue = await AsyncStorage.getItem(storage_key)
            return jsonvalue != null ? JSON.parse(jsonvalue) : null;
          } catch(e) {
              alert("storage retrieval failed, returned error:\n " + e);
              return null;
          }
    }

    function getAge(){
        const today = new Date();
        const calAge = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();
        if (m === 0 && today.getDate < date.getDate()) {
            calAge--
        };
        return calAge;
    };

    React.useEffect(()=>{
        getAsync("name").then(
            (data) => (data != null) ? setName(data) : void 0
        );
        getAsync("email").then(
            (data) => (data != null) ? setEmail(data) : void 0
        );
        getAsync("location").then(
            (data) => (data != null) ? setLocation(data) : void 0
        );
        getAsync("date").then(
            (data) => (data != null) ? setDate(new Date(data)) : void 0
        );
    }, []);

    const _checkExistingID = async () => {
        try {
            const interim = await AsyncStorage.getItem('UID');
            if (interim !== null) {
              //Unique user ID retrieved successfully 
              console.debug("retrieved user ID:\n " + interim);
              userID.current = interim;
            } else {
                console.debug("Can't find user ID, creating new ID...");
                userID.current =  uuid.v4();
                _storeData('UID');
            }
        } 
        catch (error) {
            alert("Error while checking ID:\n " + error);
        

      }
    }


    const _storeData = async (storage_key) => {
      try {
        await AsyncStorage.setItem(
          storage_key,
          userID.current,
        );
        console.debug("beep boop writing UID " + userID.current);
      } catch (error) {
        alert("Storage failed, returned error:\n " + error)
      }
    };


    //runs in the background whenever page is loaded, makes sure userID is always initialised
    _checkExistingID();




    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            expoClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
            iosClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
            androidClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
            webClientId: '793240191476-ofejd502i32tp7vhkci5pkmkgahm6rrb.apps.googleusercontent.com',
        },
    );

    const navigation = useNavigation();

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);

        }
    }, [response]);


    // This function doesn't work properly as of yet - probably need to clear async storage
    const doUserLogOut = () => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signOut(auth, credential);
        }
    };

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





    // const doUserLogOut = async function () {
    //     return await Parse.User.logOut()
    //         .then(async () => {
    //             // To verify that current user is now empty, currentAsync can be used
    //             const currentUser = await Parse.User.currentAsync();
    //             if (currentUser === null) {
    //                 Alert.alert('Success!', 'No user is logged in anymore!');
    //             }
    //             // Navigation dispatch calls a navigation action, and popToTop will take
    //             // the user back to the very first screen of the stack
    //             navigation.dispatch(StackActions.popToTop());
    //             return true;
    //         })
    //         .catch((error) => {
    //             Alert.alert('Error!', error.message);
    //             return false;
    //         });
    // };


    const confirmEdit = () => {
        setVisible(true)
        setDisability(true)

        const calAge = getAge();
        storeAsyncJSON("name", name);
        storeAsyncJSON("location", location);
        storeAsyncJSON("email", email);
        storeAsyncJSON("date", date.toDateString());

        //When user confirms details, write them to the firebase RTDB
        const database = getDatabase();
        set(ref(database, "users/" + userID.current), {
            address: email,
            username: name,
            age: calAge,
            locations: userData.location
        });
        console.debug("changes saved under UID " + userID.current);
    }

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }


    const signinMode = () => {
        setVisible1(!visibility1)

    }

    const signoutMode = () => {
        setVisible1(!visibility1)
    }

    const renderGoogleButton = () => {
        if (visibility1) {
            return (
                <Layout style={styles.signinView}>
                    <Image
                        source={require('../assets/GoogleIcon.png')}
                        style={{
                            height: 43, width: 43, borderColor: 'black', borderWidth: 2, backgroundColor: '#0000ff', justifyContent: 'center'
                        }} />
                    <Button

                        style={styles.googlebutton}
                        disabled={!request}
                        onPress={() => {
                            promptAsync(); signoutMode();
                        }} >


                        <Text style={styles.googlebuttontext}>{"Google Sign-in"}</Text>
                    </Button>
                </Layout>
            )
        } else {
            return (
                <View style={styles.login_wrapper}>
                    <View style={styles.form}>
                        <Button style={{ justifyContent: 'center', width: 200, alignSelf: 'center', backgroundColor: '#0000ff' }}
                            onPress={() => { doUserLogOut(); signinMode(); clearAsyncStorage() }}>
                            <View style={styles.buttonLogout}>
                                <Text style={styles.button_label}>{'Logout'}</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            )
        }
    }




    const edittingMode = () => {
        setDisability(false)
        setVisible(!visibility)

    }

    const cancelEditMode = () => {
        setDisability(true)
        setVisible(!visibility)
    }

    const renderButton = () =>{
        if(visibility){
            return(
            <Button style= {{justifyContent:'center', width: 200, alignSelf:'center', marginTop:40, marginBottom: 50}}status='info' onPress={edittingMode}>
                Edit Profile
            </Button>
            )
        }else{
            return(
            <Layout style={{flexDirection:'row',marginTop:40}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                     <Button style= {{flex: 1, justifyContent:'center', width: "40%", alignSelf:'center', marginBottom:50 ,marginLeft:10, marginRight:10}}status='danger' onPress={() => cancelEditMode()}>
                         Exit
                    </Button>
                     <Button style= {{flex: 1, justifyContent:'center', width: "40%", alignSelf:'center', marginBottom:50 ,marginLeft:10, marginRight:10}}status='success' onPress={() => confirmEdit()}>
                         Confirm
                    </Button>
                </View>
            </Layout>
            )
        }
    }

    return (
        <Layout style={{ flex: 1, backgroundColor: "#FFF", flexDirection: "column" }}>
            <KeyboardAwareScrollView extraHeight={120}>
                <Layout style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Image source={profBanner} style={{ width: "100%", height: 100, borderBottomWidth: 3, borderColor: "#000000" }} />
                    <Image source={profIcon} style={{ position: "absolute", width: 100, height: 100, top: 50 }} />
                </Layout >
                <Layout style={{ zIndex: -1 }} >
                    <Layout style={{ marginHorizontal: 30, backgroundColor: "transparent" }}>
                        <Layout style={styles.container}>
                            <Text>Name: </Text>
                            <Input style={styles.input}
                                value={name}
                                disabled={boolDisabled}
                                placeholder={name}
                                status='info'
                                onChangeText={nextValue => setName(nextValue)} />
                        </Layout>
                        <Layout style={styles.container}>
                            <Text>Email:</Text>
                            <Input style={styles.input}
                                value={email}
                                disabled={boolDisabled}
                                placeholder={email}
                                status='warning'
                                onChangeText={nextValue => setEmail(nextValue)} />
                        </Layout>
                        <Layout style={{ marginTop: 20, }}>
                            <Text>Age: {getAge().toLocaleString()}</Text>
                            <Datepicker
                                min={new Date(1900, 0, 0)}
                                max={new Date()}
                                disabled={boolDisabled}
                                date={date}
                                status='danger'
                                onSelect={nextDate => setDate(nextDate)}
                            />

                        </Layout>
                        <Layout style={styles.container}>
                            <Text>From: </Text>
                            <Input style={styles.input}
                                value={location}
                                disabled={boolDisabled}
                                placeholder={location}
                                status='warning'
                                onChangeText={nextValue => setLocation(nextValue)} />
                        </Layout>
                    </Layout>
                    {renderButton()}
                    {renderGoogleButton()}
                </Layout>

            </KeyboardAwareScrollView >

        </Layout >

    )
}

const styles = StyleSheet.create({
    textstyle: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    textLayout: {
        flexDirection: 'row',
        marginVertical: 20
    },
    input: {
        flex: 1,
        margin: 2,
    },
    container: {
        marginTop: 30
    },
    googlebutton: {
        backgroundColor: '#0000ff',
        width: 160,
        borderWidth: 2,
        paddingVertical: 10

    },
    googlebuttontext: {
        fontSize: 14,
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    signinView: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 45,
        marginBottom: 50
    },
    login_wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 50
    },
    form: {
        width: '100%',
        maxWidth: 280,
    },
    button_label: {
        color: '#fff',
        fontSize: 15,
    },
    buttonLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        backgroundColor: '#0000FF',
        fontSize: 14,
    },


})

