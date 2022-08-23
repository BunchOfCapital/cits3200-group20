import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';

import tooth from './assets/tooth(COPYRIGHT).jpg'


export const InfoPage = ({ navigation }) => {
  return ( 
    /*HEADER AND NAV*/
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFF5"}}>
        <Text category='h1' style={{ color: '#999', fontSize: 40 }}>Welcome home</Text>
        <Layout style={styles.container} level='1'>
          <Button style ={styles.button} status="danger" onPress={() => navigation.navigate('Home')} > Home </Button>
          <Button style ={styles.button} status="success"> Assessment </Button>
          <Button style ={styles.button} status="warning"> Quizzes </Button>
          <Button style ={styles.button} status="info"> Account </Button>
        </Layout>
      {/*MAIN PAGE CONTENTS*/}
        <Text>
          Welcome to the Info Page
          Select a topic to start learning
          This is an additional paragraph, lorum ipsum and all that, but I want to make CIRCLES
        </Text>
        <ScrollView>
          <View style={styles.infoBubble}>
            <Text style={{textAlign: 'center', textAlignVertical: 'center', flex: 1}}>
              Topic 1
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  infoBubble: {
    borderRadius: 100,
    margin: 100,
    width: 150,
    height: 150,
    backgroundColor: 'red',
    // alignContents: 'centre',
    alignSelf: 'flex-end'
  }
});