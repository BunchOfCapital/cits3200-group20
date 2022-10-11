import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Input, Datepicker, Pressable } from '@ui-kitten/components';
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



import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { buildCodeAsync } from 'expo-auth-session/build/PKCE';

WebBrowser.maybeCompleteAuthSession();

export const ProfilePage = () => {
    const [name, setName] = React.useState(userData.name)
    const [email, setEmail] = React.useState(userData.email)
    const [location, setLocation] = React.useState(userData.location)
    const [boolDisabled, setDisability] = React.useState(true)
    const [date, setDate] = React.useState(userData.dob);
    const [age, setAge] = React.useState(userData.age)
    const [visibility, setVisible] = React.useState(true)

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




    const confirmEdit = () => {
        setVisible(true)
        setDisability(true)
        const today = new Date()
        const calAge = today.getFullYear() - date.getFullYear()
        const m = today.getMonth() - date.getMonth()
        if (m === 0 && today.getDate < date.getDate()) {
            calAge--
        }
        setAge(calAge)
        userData.age = calAge
        userData.name = name;
        userData.location = location;
        userData.email = email;

        // const password = "password";

        // const auth = getAuth();
        // createUserWithEmailAndPassword(auth, email, password)
        //   .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     // ...
        //       })
        //       .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // ..
        //       });

        const database = getDatabase();
        set(ref(database, "users/" + "2"), {
            address: email,
            username: name,
            age: calAge,
            locations: userData.location
        });
        alert("Changes have been saved");
    }

    const edittingMode = () => {
        setDisability(false)
        setVisible(!visibility)

    }

    const cancelEditMode = () => {
        setDisability(true)
        setVisible(!visibility)
    }

    const renderButton = () => {
        if (visibility) {
            return (
                <Button style={{ justifyContent: 'center', width: 200, alignSelf: 'center', marginTop: 40 }} status='info' onPress={edittingMode}>
                    Edit Profile
                </Button>
            )
        } else {
            return (
                <Layout style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Button style={{ justifyContent: 'center', width: 150, alignSelf: 'center', marginHorizontal: 30 }} status='danger' onPress={() => cancelEditMode()}>
                        Exit
                    </Button>
                    <Button style={{ justifyContent: 'center', width: 150, alignSelf: 'center', marginHorizontal: 10 }} status='success' onPress={() => confirmEdit()}>
                        Confirm
                    </Button>
                </Layout>
            )
        }
    }

    return (
        <Layout style={{ flex: 1, backgroundColor: "#FFF", flexDirection: "column" }}>
            <KeyboardAwareScrollView extraHeight={120}>
                <Layout style={{ alignItems: 'center', marginVertical: 20 }}>
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
                            <Text>Age: {age.toLocaleString()}</Text>
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
                    <Button

                        style={styles.googlebutton}
                        disabled={!request}
                        onPress={() => {
                            promptAsync();
                        }} >
                        <Image
                            source={require('../assets/GoogleIcon.png')}
                            style={styles.ImageIconStyle} />
                        <Text style={styles.googlebuttontext}>{"Signin with Google"}</Text>
                    </Button>

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
        paddingHorizontal: 10,
        justifyContent: 'center',
        width: 200,
        alignSelf: 'center',
        marginTop: 17
    },
    googlebuttontext: {
        fontSize: 14,
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    ImageIconStyle: {
        height: 40,
        width: 40,
        resizeMode: 'stretch'
    }
})

