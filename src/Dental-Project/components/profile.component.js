import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet} from 'react-native';
import { Button ,Input, Datepicker} from '@ui-kitten/components';
import userData from '../Data/userData';
import closeImg from '../assets/DentistImage.jpg'


export const ProfilePage = () =>{
    const [name,setName] = React.useState(userData.name)
    const [email,setEmail] = React.useState(userData.email)
    const [location,setLocation] = React.useState(userData.location)
    const [boolDisabled,setDisability] = React.useState(false)
    const [date, setDate] = React.useState(new Date());
    const [age, setAge] = React.useState(userData.age)

    const datepickerVisibility = React.useRef();

    

    return(
        <Layout style={{flex: 1, backgroundColor: "#FFF",flexDirection:"column"}}>         
            <Layout style ={{alignItems:'center',marginVertical:20}}>
                <Image source={closeImg} style={{width:200, height:200,borderRadius:200/2}}/>
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
                    <Layout style={styles.container}>
                        <Text>Age: {age.toLocaleString()}</Text>
                        <Datepicker
                        min={new Date(1900, 0, 0)}
                        max={new Date()}
                        ref={datepickerVisibility}
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
                            status='success'
                            onChangeText={nextValue => setLocation(nextValue)}/>
                    </Layout>
                </Layout>
                <Button style= {{justifyContent:'center', width: 200, alignSelf:'center', marginTop:40}}status='info' onPress={()=>setDisability(!boolDisabled)}>Edit Profile</Button>
            </Layout>
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
        marginVertical:30
    },
})