import {Component} from 'react';
import {  ScrollView,Text, StyleSheet,SafeAreaView,ImageBackground, View,Pressable,Image,TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';


export default class Assessment extends Component {
    
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
        return this.state.page ? <ImageBackground style={this.style.container} source={require('../static/img/toochP.jpg')}>
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
                            uri: 'https://r3---sn-npoeens7.googlevideo.com/videoplayback?expire=1661981641&ei=aH8PY-asN8TC1wbvoqCQCA&ip=51.159.70.199&id=o-AN-Bjoha6eiXqXOY7jpJAOFKcOiU24MQMSbj4pUUezC3&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=f3sG0RzdAjDrjQ5gE5YVRz8H&ratebypass=yes&dur=397.455&lmt=1634259680901624&fexp=24001373,24007246&c=WEB&rbqsm=fr&txp=5432434&n=ncHtFIkU6wNydw&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,ratebypass,dur,lmt&sig=AOq0QJ8wRQIhAMMWdnqo9yO7q4kLEckWJbUoBvYH_3snE3rypg38mfjvAiBrOKX4NEbb1df-vAyWhMOBJHgb5pD-3gSqAOmaI_XM6w%3D%3D&cms_redirect=yes&mh=_z&mip=206.189.159.126&mm=31&mn=sn-npoeens7&ms=au&mt=1661959531&mv=m&mvi=3&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgXLqIauXIKRfUnv-hR-zOtKezRbgZnhbkPzs9rlzOIOgCIHRJgHLgoNdlOlDxWaMW2XyBkLGpck61UTIllnNxbXmI',
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
        : <App></App>;
    }

}





export function App() {
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
        
        Alert.alert(['红','绿','蓝'][Math.floor(Math.random()*3)])
    }
};

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
          ><Image source={require('../static/img/c.png')}></Image></TouchableOpacity>
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
