import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView , ImageBackground} from 'react-native';
import { Button } from '@ui-kitten/components';
import cloud from '../assets/cloud.png';
import wallpaper from '../assets/7284061(1).png'
import { Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import {Shadow} from 'react-native-shadow-2';


export const HomeScreen = () => {
      const Header = (props) => (
      <Layout {...props}>
        <Text category='h6'>Smoking</Text>
        <Text category='s1'>Recommended Topic</Text>
        {/*<Image source={tooth} style={{ width: 50, height:50, position: 'right'  }} />*/}
      </Layout>
    );

    const Footer = (props) => (
      <Layout {...props} style={[props.style, styles.footerContainer]}>
        <Button
          style={styles.footerControl}
          size='small'
          status = "info"
          onPress={() => navigation.navigate('Info')}>
          LEARN MORE
        </Button>
      </Layout>
    );
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
    
    <Layout style={{flex:0.2, padding: 5, backgroundColor: "transparent", marginTop:10}}>
      <ScrollView horizontal = {true} showsHorizontalScrollIndicator={false} style={{flex:0.1}}>
          <Card  style={styles.cardSmall} status='danger'>
            <Text>Quiz</Text>
          </Card>

          <Card style={styles.cardSmall} status='success'>
            <Text> Check on your Assessment</Text>
          </Card>

          <Card style={styles.cardSmall} status='info'>
            <Text>Your closest dentist</Text>
          </Card>

          <Card style={styles.cardSmall} status='warning'>
            <Text>Warning</Text>
          </Card>


        </ScrollView>
      </Layout>
    
    <Layout style ={{flex: 0.4, backgroundColor: "transparent", position:"absolute", bottom:100}}>   
    <Shadow  distance={5}
        startColor={'#00000010'}
        containerViewStyle={{marginVertical: 20}}
        radius={8}>
        <Card style={styles.card} header={Header} footer={Footer} status ='success'>
          <Text>
            Smoking is bad for your health but you do it anyway because you're stressed depressed and you wonder if its
            worth it, but guess what you're worth it and failure makes you stronger
          </Text>
      </Card>
    </Shadow>
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
  button: {
    margin: 1,
    flex: 1,
    flexDirection: 'row'
  },
  card: {
    borderRadius: 25
  },
  cardSmall: {
    borderRadius: 15
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