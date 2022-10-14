import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import { Image, useWindowDimensions, StyleSheet, TouchableOpacity, ScrollView, View, TouchableWithoutFeedback, Animated, Pressable, Modal, Linking, Platform, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from '../custom-theme.json';
import YoutubePlayer from "react-native-youtube-iframe";

import infoData, {getInfoData} from "../Data/infoData";
import kidsData, {getKidsData} from "../Data/kidsData";

// ANIMATION ON PAGE FOCUS TO GROW TOPIC SQUARES
const ExpandingView = ( props, navigation ) => {
  const sizeAnim = useRef(new Animated.Value(2)).current;
  const isFocused = useIsFocused();

  const _grow = () => {
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
    Animated.timing(
      sizeAnim,
      {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }
    ).start();
  }

  if (isFocused) {_grow()}
  if (!isFocused) {_shrink()}

  return (
    <Animated.View
      style = {[
        styles.infoBubble,
        {
          ...props.style,
        },
        {
          transform: [ {scaleY: sizeAnim}, {scaleX: sizeAnim}],
        }
      ]}> 
        {props.children}
      </Animated.View>
    );
}


export const InfoPage = ({ navigation }) => {

  // VARIABLES TO CONTROL MODAL LOCATIONS, A NEW ONE IS NEEDED FOR EACH TOPIC
  const [mod1, setMod1] = useState(false);
  const [mod2, setMod2] = useState(false);
  const [mod3, setMod3] = useState(false);
  const [mod4, setMod4] = useState(false);
  const [mod5, setMod5] = useState(false);

  // RECORDS WHETHER WE ARE VIEWING THE KIDS PAGE
  const [isKids, toggleKids] = useState(false);
  const [contentArray, setContentArray] = useState(getInfoData());

  const slideAnimRight = useRef(new Animated.Value(0)).current;
  const slideAnimLeft = useRef(new Animated.Value(0)).current;

  const onscreen = useRef(true);
  const {height, width} = useWindowDimensions();


// ANIMATION TO SLIDE TOPIC SQUARES AS MODAL IS OPENED
  const _slideoff = () => {
  onscreen.current = false;
  Animated.parallel([
    Animated.timing(
    slideAnimRight,
    {
      toValue: width*2,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(
    slideAnimLeft,
    {
      toValue: width*-2,
      duration: 250,
      useNativeDriver: true,
    })
    ]).start();
  };

  const _slideback = () => {
    onscreen.current = true;
    Animated.parallel([
      Animated.timing(
      slideAnimRight,
      {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(
        slideAnimLeft,
        {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    };

  const swapsides = () => {
    {onscreen.current ? _slideoff() : _slideback()}
  }

  const sleep = milliseconds => new Promise(
    resolve => setTimeout(resolve, milliseconds)
  );

  const loadkids = () => {
    //[contentArray, topicNum] = useState(getKidsData());
    setContentArray( arr => getKidsData());
  };

  const unloadkids = () => {
    //[contentArray, topicNum] = useState(getInfoData());
    setContentArray( arr => getInfoData());
  }


  const swapkids = async () => {
    swapsides();
    await sleep(10);
    { isKids ? unloadkids() : loadkids() }
    toggleKids(!isKids);
    await sleep(450);
    swapsides();
    //alert("kids now " + isKids);
  }


  // VARIABLES TO SUPPORT VIDEO PLAYER
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {    if (state === "ended") {      setPlaying(false);      Alert.alert("video has finished playing!");    }  }, []);
  const togglePlaying = useCallback(() => {    setPlaying((prev) => !prev);  }, []);

  return ( 
      <Layout style={{flex: 1, backgroundColor: "#FFFFF5"}}>
      {/*PAGE HEADER*/}
        <Text style={{textAlign: 'center', fontFamily:'Futura-Heavy-font', fontSize:20 }}>
         Tap a topic to find out more
        </Text>
      {/*MAIN BODY*/}
        <ScrollView style={{margin: 10, overflow: 'scroll'}} showsVerticalScrollIndicator={false}>

        {/*KIDS MODE BUTTON*/}
        <ExpandingView style={styles.kidsButton}>
            <Pressable onPress={() => swapkids()}>      
              <Text style={{fontSize: 11, textAlign: 'center'}}>
                KIDS MODE
              </Text>
            </Pressable>
        </ExpandingView>

        {/*TOPIC 1*/}
          <ExpandingView style={{backgroundColor: '#ABEC7E', alignSelf: 'flex-end', translateX: slideAnimRight}}>
              <TouchableWithoutFeedback onPress={() => {setMod1(true); swapsides();}}>
                  <Text style={styles.topicName}>
                    {contentArray[0]['name']}
                  </Text>
              </TouchableWithoutFeedback >
          </ExpandingView>
        {/*MODAL 1*/}
            <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={mod1}
                onRequestClose={ () => {
                  setMod1(!mod1);
                  swapsides();
                }}> 
                  <View style={[styles.modalBody, {borderColor: '#ABEC7E', backgroundColor: '#F5FEE6'}]}>
                    <Text style={styles.topicTitle}> {contentArray[0]['name']} </Text>
                    <Text style={styles.modalText}> {contentArray[0]['content']} </Text>
                    <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                    <Text style={styles.modalText}> {contentArray[0]['content2']} </Text>
                    <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                    <Text style= {styles.modalText}> {contentArray[0]['content3']} </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Pressable onPress={() => Linking.openURL(contentArray[0]['link'])}>
                        <Text style={styles.backButton}>More</Text>
                      </Pressable>
                      <Pressable onPress={() => {setMod1(!mod1); swapsides();}}>
                         <Text style={styles.backButton}>Back</Text>
                      </Pressable>
                    </View>

                  </View>
              </Modal>
            </View>

        {/*TOPIC 2*/}
          <ExpandingView style={{backgroundColor: '#98ECFD', translateX: slideAnimLeft}}>
            <TouchableWithoutFeedback onPress={() => {setMod2(true); swapsides();}}>
              <Text style={styles.topicName}>
                {contentArray[1]['name']}
              </Text>
            </TouchableWithoutFeedback>
          </ExpandingView>
        {/*MODAL 2*/}
            <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={mod2}
                onRequestClose={ () => {
                  setMod2(!mod2);
                  swapsides();
                }}> 
                  <View style={[styles.modalBody, {borderColor: '#98ECFD', backgroundColor: '#DAF6FE'}]}>
                    <Text style={styles.topicTitle}> {contentArray[1]['name']} </Text>
                    <Text style={styles.modalText}> {contentArray[1]['content']} </Text>
                    <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                    <Text style={styles.modalText}> {contentArray[1]['content2']} </Text>
                    <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                    <View style={{backgroundColor: '#99E3FF'}}>
                      <YoutubePlayer 
                        height={140} 
                        width={250}  
                        play={true} 
                        videoId={"zGoBFU1q4g0"} 
                        webViewProps={{
                          allowsInlineMediaPlayback: false,
                          allowsFullscreenVideo: true,
                          androidLayerType: 'hardware'}}/>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Pressable onPress={() => Linking.openURL(contentArray[1]['link'])}>
                        <Text style={styles.backButton}>More</Text>
                      </Pressable>
                      <Pressable onPress={() => {setMod2(!mod2); swapsides();}}>
                         <Text style={styles.backButton}>Back</Text>
                      </Pressable>
                    </View>

                  </View>
              </Modal>
            </View>

        {/*TOPIC 3*/}
          <ExpandingView style={{backgroundColor: '#FFC17A', alignSelf: 'flex-end', translateX: slideAnimRight}}>
            <TouchableWithoutFeedback onPress={() => {setMod3(true); swapsides();}}>
              <Text style={styles.topicName}>
                {contentArray[2]['name']}
              </Text>
            </TouchableWithoutFeedback>
          </ExpandingView>
        {/*MODAL 3*/}
            <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={mod3}
                onRequestClose={ () => {
                  setMod3(!mod3);
                  swapsides();
                }}> 
                  <View style={[styles.modalBody, {borderColor: '#FFC17A', backgroundColor: '#FFFAD9'}]}>
                    <Text style={styles.topicTitle}> {contentArray[2]['name']} </Text>
                    <Text style={styles.modalText}> {contentArray[2]['content']} </Text>
                    <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                    <Image source={require('../assets/plaque(450x299).jpg')} style={{height: 150, width: 250}} />
                    <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                    <Text style={styles.modalText}> {contentArray[2]['content2']} </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Pressable onPress={() => Linking.openURL(contentArray[2]['link'])}>
                        <Text style={styles.backButton}>More</Text>
                      </Pressable>
                      <Pressable onPress={() => {setMod3(!mod3); swapsides();}}>
                         <Text style={styles.backButton}>Back</Text>
                      </Pressable>
                    </View>

                  </View>
              </Modal>
            </View>

        {/*TOPIC 4*/}
          <ExpandingView style={{backgroundColor: '#FFA187', translateX: slideAnimLeft}}>
            <TouchableWithoutFeedback onPress={() => {setMod4(true); swapsides();}}>
              <Text style={styles.topicName}>
                {contentArray[3]['name']}
              </Text>
            </TouchableWithoutFeedback>
          </ExpandingView>
        {/*MODAL 4*/}
            <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={mod4}
                  onRequestClose={ () => {
                    setMod4(!mod4);
                    swapsides();
                  }}> 
                    <View style={[styles.modalBody, {borderColor: '#FF7F6B', backgroundColor: '#FFE6D7'}]}>
                      <Text style={styles.topicTitle}> {contentArray[3]['name']} </Text>

                      <Text style={styles.modalText}> {contentArray[3]['content']} </Text>                    
                      <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                      <Text style={styles.modalText}> {contentArray[3]['content2']} </Text>
                      <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                      <Image source={require('../assets/gingivitis_diagram.png')} style={{height: 150, width: 190}} />

                      <View style={{flexDirection: 'row'}}>
                        <Pressable onPress={() => Linking.openURL(contentArray[3]['link'])}>
                          <Text style={styles.backButton}>More</Text>
                        </Pressable>
                        <Pressable onPress={() => {setMod4(!mod4); swapsides();}}>
                           <Text style={styles.backButton}>Back</Text>
                        </Pressable>
                      </View>

                    </View>
                </Modal>
              </View>

        {/*TOPIC 5*/}
          <ExpandingView style={{backgroundColor: '#FF4294', alignSelf: 'flex-end', marginBottom: 50, translateX: slideAnimRight}}>
            <TouchableWithoutFeedback style={{alignItems: 'center'}} onPress={() => {setMod5(true); swapsides();}}>
              <Text style={styles.topicName}>
                {contentArray[4]['name']}
              </Text>
            </TouchableWithoutFeedback>
          </ExpandingView>
        {/*MODAL 5*/}
            <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={mod5}
                  onRequestClose={ () => {
                    setMod5(!mod5);
                    swapsides();
                  }}> 
                    <View style={[styles.modalBody, {borderColor: '#FF4294', backgroundColor: '#FFE8D7'}]}>
                      <Text style={styles.topicTitle}> {contentArray[4]['name']} </Text>

                      <Text style={[styles.modalText, {textAlign: 'center'}]}> {contentArray[4]['content']} </Text>
                      <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                      <Text style={[styles.modalText, {textAlign: 'center'}]}> {contentArray[4]['content2']} </Text>

                      <Pressable onPress={() => {setMod5(!mod5); swapsides();}}>
                         <Text style={styles.backButton}>Back</Text>
                      </Pressable>

                    </View>
                </Modal>
              </View>


             {/* TOPIC TEMPLATE FOR ADDITIONAL TOPICS*/}

          {/*TOPIC BOX
          ALIGN SELF IS FLEX-END FOR RIGHT SIDE, REMOVE FOR LEFT SIDE BOX
          slideAnim****:  use slideAnimRight or slideAnimLeft depending on which side the box is
          setModN: Replace N with the number corresponding to the topic number, once you've created a corresponding state var above
          margin: if the topic is the final once, a margin of ~-30 will make sure it doesn't overlap with navbar
          N: replace all instances of N with the topic number
          Ensure actual text is filled out in ../Data/infoData,js file

            <ExpandingView style={{backgroundColor: 'COLOUR', alignSelf: 'flex-end', marginBottom: 50, translateX: slideAnim****}}>
              <TouchableWithoutFeedback style={{alignItems: 'center'}} onPress={() => {setModN(true); swapsides();}}>
                <Text style={styles.topicName}>
                  {contentArray[N-1]['name']}
                </Text>
              </TouchableWithoutFeedback>
            </ExpandingView>
          {/*MODAL
              <View style={[styles.centeredContent, {backgroundColor: '#6690FF', margin: -30}]}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modN}
                    onRequestClose={ () => {
                      setMod5(!modN);
                      swapsides();
                    }}> 
                      <View style={[styles.modalBody, {borderColor: 'COLOUR', backgroundColor: 'COLOUR'}]}>

                      *MODAL TITLE*
                        <Text style={styles.topicTitle}> {contentArray[N-1]['name']} </Text>

                      *MAIN MODAL TEXT *
                        <Text style={[styles.modalText, {textAlign: 'center'}]}> {contentArray[N-1]['content']} </Text>
                        <Image source={require('../assets/tooth_lineart.png')} style={styles.linebreakImage} />
                        <Text style={[styles.modalText, {textAlign: 'center'}]}> {contentArray[N-1]['content2']} </Text>

                      *BACK AND MORE BUTTONS*
                        <View style={{flexDirection: 'row'}}>
                        <Pressable onPress={() => Linking.openURL(contentArray[N]['link'])}>
                          <Text style={styles.backButton}>More</Text>
                        </Pressable>
                        <Pressable onPress={() => {setModN(!modN); swapsides();}}>
                           <Text style={styles.backButton}>Back</Text>
                        </Pressable>
                      </View>

                      </View>
                  </Modal>
                </View>*/}

        </ScrollView>
      </Layout>
  );
};

/*  Available fonts:
*   {'Sassoon-Primary', 'futura-medium-bt', 'Futura-Heavy-font', 'Futura-Book-font'}
*/
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
    height: 170,
    // alignContents: 'centre',
  },
  topicName: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    fontSize: 24,
    color: '#3B3C3F',
    fontFamily: 'futura-medium-bt',
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
    margin: '5%',
    marginTop: Platform.OS === 'ios' ? "10%": "-2%",
    padding: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    width: '95.5%',
    justifyContent: 'space-between',
    postion: 'relative',
    left: "-3%",
    bottom: Platform.OS === 'ios' ? "0%" : "-2%",
  },
  modalText: {
    textAlign: 'justify',
    fontFamily: 'Futura-Book-font',
    fontSize: 16,
  },
  topicTitle: {
    fontSize: 28,
    color: '#3B3C3F',
    marginBottom: 5,
    flexDirection: 'row',
    fontFamily: 'Futura-Heavy-font',
    
  },
  linebreakImage: {
    height: '7%', 
    width: '40%',
    justifyContent: 'space-around',
    resizeMode: 'contain'
  },
  backButton: {
    justifyContent: 'flex-end',
    backgroundColor: '#FF47A6',
    borderRadius: 15,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 4 : 3,
    marginHorizontal: 15,
    overflow: 'hidden',
    fontSize: 16,
    width: 70,
    height: 28,
    fontFamily: 'futura-medium-bt',
  },
  kidsButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 50,
    width: 50,
    textAlign: 'center',
    justifyContent: 'center',
    margin: '2%',
    position: 'absolute'
  }
});


// {alignSelf: 'flex-end', backgroundColor: '#9CE463'},