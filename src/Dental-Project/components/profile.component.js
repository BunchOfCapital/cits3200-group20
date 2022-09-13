import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet,KeyboardAvoidingView, ScrollView} from 'react-native';
import { Button ,Input, Datepicker} from '@ui-kitten/components';
import userData from '../Data/userData';
import closeImg from '../assets/DentistImage.jpg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export const ProfilePage = () =>{
    const [name,setName] = React.useState(userData.name)
    const [email,setEmail] = React.useState(userData.email)
    const [location,setLocation] = React.useState(userData.location)
    const [boolDisabled,setDisability] = React.useState(false)
    const [date, setDate] = React.useState(userData.dob);
    const [age, setAge] = React.useState(userData.age)
    const [visibility, setVisible] = React.useState(true)
    
    const confirmEdit = () =>{
        setVisible(true)
        setDisability(true)
        const today = new Date()
        const calAge = today.getFullYear() - date.getFullYear()
        const m = today.getMonth() - date.getMonth()
        if(m === 0 && today.getDate < date.getDate()){
            calAge--
        }
        setAge(calAge)
        userData.age = calAge
        userData.name = name;
        userData.location = location;
        userData.email = email;
    }

    const edittingMode = () =>{
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
            <Button style= {{justifyContent:'center', width: 200, alignSelf:'center', marginTop:40}}status='info' onPress={edittingMode}>Edit Profile</Button>
            )
        }else{
            return(
            <Layout style={{flexDirection:'row',marginTop:40}}>
                 <Button style= {{justifyContent:'center', width: 150, alignSelf:'center', marginHorizontal:30}}status='danger' onPress={confirmEdit}>Exit</Button>
                 <Button style= {{justifyContent:'center', width: 150, alignSelf:'center', marginHorizontal:10}}status='success' onPress={cancelEditMode}>Confirm</Button>
            </Layout>
            )
        }
    }

    return(
        <Layout style={{flex: 1, backgroundColor: "#FFF",flexDirection:"column"}}>  
            <KeyboardAwareScrollView extraHeight={120}>
            <Layout style ={{alignItems:'center',marginVertical:20}}>
                <Image source={closeImg} style={{width:100, height:100,borderRadius:200/2}}/>
            </Layout >
            <Layout >
                <Layout style ={{marginHorizontal:30, backgroundColor:"transparent"}}>
                    <Layout style={styles.container}>
                        <Text>Name: </Text>
                        <Input style={styles.input}
                            value={name}
                            disabled = {boolDisabled}
                            placeholder= {name}
                            status='info'
                            onChangeText={nextValue => setName(nextValue)}/>
                    </Layout>
                    <Layout style={styles.container}>
                        <Text>Email:</Text>
                        <Input style={styles.input}
                            value={email}
                            disabled = {boolDisabled}
                            placeholder= {email}
                            status='warning'
                            onChangeText={nextValue => setEmail(nextValue)}/>
                    </Layout>
                    <Layout style={{marginTop:20,}}>
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
                            disabled = {boolDisabled}
                            placeholder= {location}
                            status='warning'
                            onChangeText={nextValue => setLocation(nextValue)}/>
                    </Layout>
                </Layout>
                {renderButton()}
            </Layout>
            </KeyboardAwareScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    textstyle: {
        fontSize:20,
        marginTop:10,
        fontWeight:'bold'
    },
    textLayout: {
        flexDirection:'row',
        marginVertical:20
    },
    input: {
        flex: 1,
        margin: 2,
      },
    container:{
        marginTop:30
    },
})