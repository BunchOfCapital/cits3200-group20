import React, { useRef, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, ScrollView, View, TouchableWithoutFeedback, Animated, Pressable } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from '../custom-theme.json';

const ExpandingView = ( props, navigation ) => {
  const heightAnim = useRef(new Animated.Value(2)).current
  const isFocused = useIsFocused();

  const opened = useRef(true);

  const _grow = () => {
    opened.current = true;
    Animated.timing(
      heightAnim,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }
    ).start();
  };

  const _shrink = () => {
    opened.current = false;
    Animated.timing(
      heightAnim,
      {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }
    ).start();
  }

  if (isFocused) {_grow()}
  if (!isFocused) {_shrink()}

  const scaling = heightAnim;

  const swap = () => {
    {opened.current ? _shrink() : _grow()}
  }
  

  return (
    <Animated.View
      style = {[
        styles.infoBubble,
        {
          ...props.style,
          width: 170, 
        },
        {
          transform: [{scaleX: scaling}, {scaleY: scaling}],
        }
      ]}> 
      <TouchableWithoutFeedback onPress={() => swap()}>
        {props.children}
      </TouchableWithoutFeedback>
      </Animated.View>
    );
}


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
        <ScrollView style={{margin: 10, overflow: 'scroll'}} showsVerticalScrollIndicator={false}>
        <View>
          <ExpandingView style={{backgroundColor: '#ABEC7E', alignSelf: 'flex-end'}}>
              <Text style={styles.topicName}>
                Gum Diseases
              </Text>
          </ExpandingView>
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

          <View style={[styles.infoBubble,{backgroundColor: '#FF4294', alignSelf: 'flex-end', marginBottom: 50}]}>
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
    position: 'relative',
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: -30,
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