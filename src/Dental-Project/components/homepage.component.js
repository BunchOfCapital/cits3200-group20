import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView , ImageBackground} from 'react-native';
import { Button } from '@ui-kitten/components';
import cloud from '../assets/cloud.png';
import wallpaper from '../assets/7284061(1).png'
import { Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { DailyInfo } from './card.component';
import { CardNav } from './homenav.component';

export const HomeScreen = () => {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

  return (
  <Layout style={{flex: 1, backgroundColor: "#FFFFF5"}}>
    <ImageBackground source={wallpaper} resizeMode="cover" style ={{flex:1}}>    
    <Layout style={{paddingBottom:30, backgroundColor: "transparent",alignItems:"center", paddingTop:10}}>
        <ImageBackground source={cloud} resizeMode="cover" style={{width: '100%', height: undefined, alignSelf:"center"}}>
          <Text level='1'  style={{justifyContent:"center", alignItems:"center", textAlign:'center', lineHeight:100, color:'white', fontSize:30, textShadowColor: "#333333", textShadowOffset: {width:1,height:1}, textShadowRadius: 1}}>Welcome Back!</Text>
        </ImageBackground>
    </Layout>
    
    <Layout style={{flex:1, padding: 5, backgroundColor: "transparent", marginTop:10}}>
      <CardNav/>
    </Layout>
    
    <Layout style ={{flex: 0.4, backgroundColor: "transparent", position:"absolute", bottom:100}}>   
      <DailyInfo/>
    </Layout>
    
    
     </ImageBackground>
     {/* <View style={styles.videoContainer}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          ref: video,
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View> */}
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

  infoBubble: {
    borderRadius: 100,
    margin: 100,
    width: 150,
    height: 150,
    backgroundColor: 'red',
    // alignContents: 'centre',
    alignSelf: 'flex-end'
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 350,
    height: 220,
  },
});