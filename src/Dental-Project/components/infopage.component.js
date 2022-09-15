import React, { useRef, useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, ScrollView, View, TouchableWithoutFeedback, Animated, Pressable, Modal } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from '../custom-theme.json';

const ExpandingView = ( props, navigation ) => {
  const sizeAnim = useRef(new Animated.Value(2)).current;
  const locationAnim = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  const xmov = useRef(30);
  const sizeval = useRef(3);

  const opened = useRef(true);
  const alignment = useRef(-20);

  const _grow = () => {
    opened.current = true;
    Animated.timing(
      sizeAnim,
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
      sizeAnim,
      {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }
    ).start();
  }

  const _expand = () => {
    if (opened.current) {
      opened.current = false;
      xmov.current = -30;
      sizeval.current = 3;
    } else {
      opened.current = true;
      xmov.current = 30;
      sizeval.current = 1;
    }
    
    Animated.sequence( [
      Animated.timing(
        locationAnim, {
          toValue: xmov.current,
          duration: 800,
          useNativeDriver: true,
        }),
      Animated.timing(
        sizeAnim, {
          toValue: sizeval.current,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
  }


  if (isFocused) {_grow()}
  if (!isFocused) {_shrink()}

  const scalingY = sizeAnim;
  const scalingX = sizeAnim;

  const swap = () => {
    {opened.current ? _expand() : _grow() }
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
          transform: [ {scaleY: scalingY}, {scaleX: scalingX}, {translateX: locationAnim}],
        }
      ]}> 
      <TouchableWithoutFeedback onPress={() => _expand()}>
        {props.children}
      </TouchableWithoutFeedback>
      </Animated.View>
    );
}


export const InfoPage = ({ navigation }) => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const onscreen = useRef(true);

  const Slide = (props) => {

    const _slideright = () => {
    onscreen.current = false;
    Animated.timing(
      slideAnim,
      {
        toValue: 200,
        duration: 20,
        useNativeDriver: true,
      }
      ).start();
    };

    const _slideleft = () => {
      onscreen.current = true;
      Animated.timing(
        slideAnim,
        {
          toValue: -200,
          duration: 20,
          useNativeDriver: true,
        }
      ).start();
      };

    const swapsides = () => {
      {onscreen.current ? _slideright() : _slideleft()}
    }

    return (
      <Animated.View
        style = {[
          {
            ...props.style,
          },
          {
            transform: [{translateX: slideAnim}],
          }]}> 
          {props.children}
      </Animated.View>
    );
  };



  return ( 
      <Layout style={{flex: 1, backgroundColor: "#FFFFF5"}}>
        <Text style={{textAlign: 'center'}}>
          Welcome to the Info Page
        </Text>
        <ScrollView style={{margin: 10, overflow: 'scroll'}} showsVerticalScrollIndicator={false}>
          <ExpandingView style={{backgroundColor: '#ABEC7E', alignSelf: 'flex-end'}}>
              <TouchableWithoutFeedback onPress={() => {setModal1Visible(true);}}>
                  <Text style={styles.topicName}>
                    Gum Diseases
                  </Text>
              </TouchableWithoutFeedback >
          </ExpandingView>

          <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal1Visible}
              onRequestClose={ () => {
                setModal1Visible(!modal1Visible)
              }}> 
                <View style={[styles.modalBody, {borderColor: '#ABEC7E', backgroundColor: '#F5FEE6'}]}>
                  <Text style={styles.topicTitle}> GUM DISEASES </Text>
                  {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
                    <Text> INFORMATION GOES HERE </Text>
                    <Pressable onPress={() => setModal1Visible(!modal1Visible)}>
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  {/*</ScrollView>*/}
                </View>
            </Modal>
          </View>

          <ExpandingView style={{backgroundColor: '#98ECFD'}}>
            <Text style={styles.topicName}>
              Plaque
            </Text>
          </ExpandingView>

          <ExpandingView style={{backgroundColor: '#FFC17A', alignSelf: 'flex-end'}}>
            <Text style={styles.topicName}>
              Teeth Care
            </Text>
          </ExpandingView>

          <ExpandingView style={{backgroundColor: '#FFA187'}}>
            <Text style={styles.topicName}>
              Tongue Health
            </Text>
          </ExpandingView>

          <ExpandingView style={{backgroundColor: '#FF4294', alignSelf: 'flex-end', marginBottom: 50}}>
            <Text style={styles.topicName}>
              Contact Us
            </Text>
          </ExpandingView>

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
    borderRadius: 10,
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
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalBody: {
    flex: 1,
    textAlign: 'center',
    margin: '10%',
    padding: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',

  },
  modalText: {
    textAlign: 'center'
  },
  topicTitle: {
    fontSize: 25,
    color: '#3B3C3F',
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  }
});


// {alignSelf: 'flex-end', backgroundColor: '#9CE463'},