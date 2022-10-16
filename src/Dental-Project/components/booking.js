import {Component} from 'react';
import {  ScrollView,Text, StyleSheet,SafeAreaView,ImageBackground, View,Pressable,Image,TouchableHighlight } from 'react-native';
import { Layout } from '@ui-kitten/components';

const dataLayer = require("../Data/map.json")


export default class ToochPage extends Component {
    
    constructor (props) {
        super(props)
        this.post_url = "https://www.dentist.com.au/index.php/ajax/processing_module"
        this.post_form = {
            module: "dsearch",
            cmd: "dentist:results:standard_list:search",
            current_page: "1",
            address: "Brisbane, QLD, 4000",
            type: "",
            value: ""
        }
        this.headers= {
          'Content-Type': 'multipart/form-data',
          "Connection":"keep-alive",
          "Accept-Encoding":"gzip, deflate, br",
          "Accept":"*/*",
          "User-Agent":"PostmanRuntime/7.29.2",
          "Content-Length":"750",
          "Host":"www.dentist.com.au"
        }
        this.body = ""
        this.state = {status:null,page:true}
        this.items = [] 

        this.style = StyleSheet.create({
          item:{
            width:"98%",
            marginTop:10,
            marginLeft:"1%",
            backgroundColor:"#F5FFFF",
            borderRadius:10,
            padding:10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation:2,
            display:"flex"
          }
        })

        dataLayer.forEach(d => {
          this.items.push(<TouchableHighlight key={d.id} underlayColor="#DDDDDD" onPress={()=>{}}   style={this.style.item}>
          <>
          <Text style={{fontWeight:"bold",marginBottom:10}}>{d.name}</Text>
          <Text style={{marginBottom:10}}>{d.address}</Text>
          <Text style={{fontWeight:"bold",marginBottom:10}}>{d.tel}</Text>
          </>
      </TouchableHighlight>)
        })

    }


    render() {
        return  <Layout style={{flex:1,backgroundColor:"#FFFFF5",marginBottom:50}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,display:"flex",flexDirection:"column", backgroundColor:"#FFFFF5"}}>
              {this.items}
          </ScrollView>
        </Layout>;
    }

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
