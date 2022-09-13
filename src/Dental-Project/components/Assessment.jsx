import {Component} from 'react';
import {  ScrollView,Text, StyleSheet,SafeAreaView,ImageBackground, View,Pressable,Image,TouchableOpacity,Button  } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {CameraPage} from './camera.component';

export default class ToochPage extends Component {
    
    constructor (props) {
        super(props)
        this.style = StyleSheet.create({
            container:{
                flex:10,
                width:"100%"
            },
            SCLView:{
                backgroundColor:"rgba(0,0,0,0)",
                paddingTop:300
            },
            title:{
                fontSize: 25,
                fontWeight: "bold",
                paddingVertical:10,
                width:"100%",
                textAlign:"center"

            },
            Table:{
                width:"100%",
                backgroundColor:"#fff",
                padding:10,
                marginTop:-20,
                paddingTop:20,
                borderTopEndRadius:30,
                borderTopStartRadius:30,
                marginTop:10,
                minHeight:1000
            },
            btn:{

                borderRadius:100,
                width:200,
                alignItems:"center",
                justifyContent:"center",
                
                color:"#2C468C",
                zIndex:1
                
            },
            tableItem:{
                height:50,
                borderWidth:1,
                borderRadius:10,
                borderColor:"#000",
                padding:10,
                flexDirection:"row",
                marginTop:10,
                justifyContent:"space-between"
            },
            tableItemText:{
                height:50,
                lineHeight:25
            },
            active:{
                backgroundColor:"rgba(172,218,219,.9)"
            },
            noActive:{
                backgroundColor:"#B8EAEB",
            }
                
        });
        this.titleColor = [128,128,128,0.7]
        setInterval(()=>{

            let data = [parseInt(Math.random() * 10),parseInt(Math.random() * 10),parseInt(Math.random() * 10)]

            this.titleColor[0] = this.titleColor[0]<data[0] ? (this.titleColor[0]+data[0]>255 ? this.titleColor[0]+data[0]*2 : this.titleColor[0]-data[0]) : (Math.random()<0.5 ? this.titleColor[0]+data[0]*2 : this.titleColor[0]-data[0]) ;
            this.titleColor[1] = this.titleColor[1]<data[1] ? (this.titleColor[1]+data[1]>255 ? this.titleColor[1]+data[1] : this.titleColor[1]-data[1]*2) : (Math.random()<0.5 ? this.titleColor[1]+data[1] : this.titleColor[1]-data[1]*2) ;
            this.titleColor[2] = this.titleColor[2]<data[2] ? (this.titleColor[2]+data[2]>255 ? this.titleColor[2]+data[2]*2 : this.titleColor[2]-data[2]) : (Math.random()<0.5 ? this.titleColor[2]+data[2] : this.titleColor[2]-data[2]*2) ;

        }, 100);
        this.state = {status:null,page:true}
    }



    render() {
        return this.state.page ? <ImageBackground style={this.style.container} source={require('../assets/toochP.jpg')}>
            <SafeAreaView >
                <ScrollView style={this.style.SCLView}>
                    <Text style={[this.style.title,,{color:"rgba("+this.titleColor[0]+","+this.titleColor[1]+","+this.titleColor[2]+","+this.titleColor[3]+")"}]}>Welcome to Pearlii's{"\n"}AI-powered Check-Ups</Text>
                    <View style={{alignItems:"center"}}>
                        <Pressable
                            onPress={() =>{this.setState({page:false})}}
                            style={({ pressed })=>pressed ? [this.style.active,this.style.btn] : [this.style.btn,this.style.noActive]}
                        >
                            <Text style={{fontSize:18,padding:10,fontWeight:"bold",color:"#1C62DC"}}>Start Check-Up</Text>
                        </Pressable>
                    </View>
                    <View style={this.style.Table}>
                        <Video
                            style={{width:"100%",height:300,borderColor:"#000",borderStyle:"solid",borderWidth:1,borderRadius:10}}
                            source={{
                            uri: 'https://cdn.videvo.net/videvo_files/video/premium/2021-04/large_watermarked/210329_09_Bali_4k_005_preview.mp4',
                            }}
                            resizeMode="contain"
                            isLooping
                            useNativeControls
                            isMuted={true}
                            onPlaybackStatusUpdate={status =>  this.setState({status:status})}
                        />
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
        : <App parent={this}></App>;
    }

}





export function App(props) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  let Cref;

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }

  const takePicture = async () => {
    if (Cref) {
        const options = {quality: 1, base64: true};
        const data = await Cref.takePictureAsync({ onPictureSaved: pic=>{
          console.log(pic)
          FileSystem.moveAsync({
            from: pic.uri,
            to: FileSystem.documentDirectory + 'Images/'
          });
        } });
        
        Alert.alert(['red','green','blue'][Math.floor(Math.random()*3)])
    }
};

const back = ()=>{
  props.parent.setState({page:true});
}

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(e)=>Cref = e}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{backgroundColor:"#ddd",borderRadius:20,padding:5}}
              onPress={takePicture}
          ><Image source={require('../assets/c.png')}></Image></TouchableOpacity>
          <TouchableOpacity
              style={{backgroundColor:"#ddd",borderRadius:20,padding:5,position:"absolute",right:10,top:20}}
              onPress={back}
          ><Image source={require('../assets/back.png')}></Image></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    width:"100%"
  },
  camera: {
    flex: 1,
    width:"100%"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 64,
    flexDirection:"column",
    alignItems:'center',
    justifyContent:'flex-end',
    width:"100%"
  },
  button: {
    marginBottom:30,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
