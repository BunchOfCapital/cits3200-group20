import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';

import tooth from './assets/tooth(COPYRIGHT).jpg'

const Header = (props) => (
  <Layout {...props}>
    <Text category='h6'>Smoking</Text>
    <Text category='s1'>By Me</Text>
    {/*<Image source={tooth} style={{ width: 50, height:50, position: 'right'  }} />*/}
  </Layout>
);

const Footer = (props) => (
  <Layout {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      SHARE
    </Button>
    <Button
      style={styles.footerControl}
      size='small'
      status = "success">
      LEARN MORE
    </Button>
  </Layout>
);

export const HomeScreen = ({ navigation }) => {

  return (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFF5"}}>
    <Text category='h1' style={{ color: '#999', fontSize: 40 }}>Welcome home</Text>
    <Layout style={styles.container} level='1'>
      <Button style ={styles.button} status="danger" onPress={() => navigation.navigate('Info')} > Info </Button>
      <Button style ={styles.button} status="success"> Assessment </Button>
      <Button style ={styles.button} status="warning"> Quizzes </Button>
      <Button style ={styles.button} status="info"> Account </Button>
    </Layout>
    <Card style={styles.card} header={Header} footer={Footer}>
      <Text>
        Smoking is bad for your health but you do it anyway because you're stressed depressed and you wonder if its
        worth it, but guess what you're worth it and failure makes you stronger
      </Text>
    </Card>
    <Layout>

    </Layout>
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