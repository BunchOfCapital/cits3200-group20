import React from 'react';
import { Text, StyleSheet, View, Pressable, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Layout } from '@ui-kitten/components';
import * as Font from 'expo-font';

let customFonts = {
  'futura-medium-bt': require('../assets/fonts/futura-medium-bt.ttf'),
  'Futura-Heavy-font': require('../assets/fonts/Futura-Heavy-font.ttf'),
  'Futura-Book-font': require('../assets/fonts/Futura-Book-font.ttf')
}

class ToochPage extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  constructor(props) {
    super(props)
    this.style = StyleSheet.create({
      background: {
        backgroundColor: '#FFE3E1',
        paddingBottom: 100
      },
      title: {
        fontSize: 42,
        fontFamily: "Futura-Heavy-font",
        textAlign: 'center',
        color: "rgb(128, 57, 69)"
      },
      mainimage: {
        height: '60%',
        width: '60%',
        flex: 1,
        paddingTop: 230,
        alignSelf: 'center',
        marginTop: '6%'
      },
      assessBtn: {
        borderRadius: 40,
        backgroundColor: "rgb(255, 253, 217)",
        width: "60%",
        alignSelf: 'center',
        borderColor: 'rgb(128, 57, 69)',
        borderWidth: 2,
        marginTop: '15%',
        marginBottom: 15
      },
      btnText: {
        fontSize: 32,
        fontFamily: "futura-medium-bt",
        color: "rgb(128, 57, 69)",
        alignSelf: 'center',
      },
      bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '8%',
      },
      smallImage: {
        height: 24,
        width: 24,
      },
      smallText: {
        fontFamily: "Futura-Book-font",
        fontSize: 16,
        color: 'rgb(128, 57, 69)',
      }

    });
    this.state = { status: null, page: true }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;

    }
    return this.state.page ?
      <View style={[this.style.background]}>
        <Text style={[this.style.title]}>Welcome to your checkup</Text>
        <Image style={[this.style.mainimage]} source={require('../assets/neutral.png')} />
        <Pressable style={[this.style.assessBtn]} onPress={() => this.props.navigation.navigate('Camera')}>
          <Text style={this.style.btnText}>Start Here</Text>
        </Pressable>
        <View style={[this.style.bottomView]}>
          <Image style={[this.style.smallImage]} source={require('../assets/TinyMas.png')} />
          <Text style={[this.style.smallText]}> You will need take a photo of your mouth</Text>
        </View>
        <View style={[this.style.bottomView]}>
          <Image style={[this.style.smallImage]} source={require('../assets/TinyMas.png')} />
          <Text style={[this.style.smallText]}> Get help from parents, siblings or friends</Text>
        </View>
        <View style={[this.style.bottomView]}>
          <Image style={[this.style.smallImage]} source={require('../assets/TinyMas.png')} />
          <Text style={[this.style.smallText]}> Or you can take a photo with a mirror</Text>
        </View>
        <View style={[this.style.bottomView]}>
          <Image style={[this.style.smallImage]} source={require('../assets/TinyMas.png')} />
          <Text style={[this.style.smallText]}> Find a well-lit room</Text>
        </View>
        <View style={[this.style.bottomView]}>
          <Image style={[this.style.smallImage]} source={require('../assets/TinyMas.png')} />
          <Text style={[this.style.smallText]}> Start your check up with the button above</Text>
        </View>
        <View style={[this.style.bottomView]}>
          <Image style={[this.style.smallImage]} source={require('../assets/TinyMas.png')} />
          <Text style={[this.style.smallText]}> Have fun!</Text>
        </View>
      </View>

      : <App parent={this}></App>;
  }

}

export default withNavigation(ToochPage);