import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from '../custom-theme.json';




export const InfoPage = ({ navigation }) => {
  return ( 
    /*HEADER AND NAV*/
      <Layout style={{flex: 1, backgroundColor: "#FFFFF5"}}>
        {/*<Text category='h1' style={[styles.banner,{fontFamily: 'monospace'}]}>Dentassistant</Text>*/}
        {/* <View>
          <Layout style={styles.container} level='1'>
            <Button style ={styles.button} status="danger" onPress={() => navigation.navigate('Home')} > Home </Button>
            <Button style ={styles.button} status="success"> Assessment </Button>
            <Button style ={styles.button} status="warning"> Quizzes </Button>
            <Button style ={styles.button} status="info"> Account </Button>
          </Layout>
        </View> */}
      {/*MAIN PAGE CONTENTS*/}
        <Text style={{textAlign: 'center'}}>
          Welcome to the Info Page
        </Text>
        <ScrollView style={{margin: 10}}>

          <View style={[styles.infoBubble,{alignSelf: 'flex-end', backgroundColor: '#ABEC7E'}]}>
            <Text style={styles.topicName}>
              Gum Diseases
            </Text>
          </View>

          <View style={[styles.infoBubble,{backgroundColor: '#98ECFD'}]}>
            <Text style={styles.topicName}>
              Plaque
            </Text>
          </View>

          <View style={[styles.infoBubble,{backgroundColor: '#FFC17A', alignSelf: 'flex-end'}]}>
            <Text style={styles.topicName}>
              Teeth Care
            </Text>
          </View>

          <View style={[styles.infoBubble,{backgroundColor: '#FFA187'}]}>
            <Text style={styles.topicName}>
              Tongue Health
            </Text>
          </View>

          <View style={[styles.infoBubble,{backgroundColor: '#FF4294', alignSelf: 'flex-end'}]}>
            <Text style={styles.topicName}>
              Contact Us
            </Text>
          </View>

        </ScrollView>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFF5'
    },
  button: {
    margin: 1,
    flex: 1,
    flexDirection: 'row'
  },
  card: {
    flex: 0.3,
    margin: 2,
  },
  infoBubble: {
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: -20,
    width: 170,
    height: 170
    // alignContents: 'centre',
  },
  topicName: {
    textAlign: 'center', 
    textAlignVertical: 'center', 
    flex: 1,
    fontSize: 20,
    color: '#3B3C3F'
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  banner: {
    color: '#3B3C3F', 
    fontSize: 40, 
    marginTop: 20, 
    textAlign: 'center'
  }
});


// {alignSelf: 'flex-end', backgroundColor: '#9CE463'},