import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';

//This will not be the home page this page for now will help you start on your way, sample ere are button and a card
//this code will get cleaned up once you get used to it and moved to its own individual component files

const Header = (props) => (
  <Layout {...props}>
    <Text category='h6'>Smoking</Text>
    <Text category='s1'>By Me</Text>
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

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFF5"}}>
    <Text category='h1'>this is the homepage</Text>
    <Layout style={styles.container} level='1'>
      <Button style ={styles.button} status="danger"> Button </Button>
      <Button style ={styles.button} status="success"> Button </Button>
      <Button style ={styles.button} status="warning"> Button </Button>
      <Button style ={styles.button} status="info"> Button </Button>
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

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    <HomeScreen />
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFF5'
    },
  button: {
    margin: 2,
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
});