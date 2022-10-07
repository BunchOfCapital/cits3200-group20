import React from 'react';
import { ScrollView, Text, StyleSheet, SafeAreaView, ImageBackground, View, Pressable, Image, TouchableOpacity, Button, Platform } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { withNavigation } from 'react-navigation';
import * as Font from 'expo-font';

let customFonts = {
  'futura-medium-bt': require('../assets/fonts/futura-medium-bt.ttf'),
  'Futura-Heavy-font': require('../assets/fonts/Futura-Heavy-font.ttf'),
  'Futura-Book-font' : require('../assets/fonts/Futura-Book-font.ttf')
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
      imageContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingTop: 60,
      },
      SCLView: {
        paddingTop: 190,
      },
      title: {
        fontSize: 42,
        fontFamily: "Futura-Heavy-font",
        paddingTop: Platform.OS === 'ios'? "7%":"4%",
        width: "100%",
        textAlign: "center",
        position: 'relative',
        bottom: "10%",
        color: "rgb(128, 57, 69)"
      },
      Table: {
        width: "100%",
        backgroundColor: "#fff",
        paddingTop: 5,
        marginBottom: 70,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        minHeight: 600
      },
      assessBtn: {
        borderRadius: 40,
        backgroundColor: "rgb(255, 253, 217)",
        marginBottom: 10,
        width: "50%",
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 2,
      },
      btnText: {
        fontSize: 28,
        fontFamily: "futura-medium-bt",
        color: "rgb(128, 57, 69)",
        paddingVertical: 4,
        alignSelf: 'center',
      }
    });
    this.state = { status: null, page: true }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return this.state.page ? <ImageBackground style={this.style.imageContainer} source={require('../assets/DentalDog.jpg')}>
      <SafeAreaView>
        <Text style={[this.style.title]}>Welcome to your{"\n"}Check Up</Text>
        <ScrollView style={this.style.SCLView}>
          <View style={{ alignItems: "center" }}>
            <Pressable style={[this.style.assessBtn]} onPress={() => this.props.navigation.navigate('Camera')}>
              <Text style={this.style.btnText}>Start Here</Text>
            </Pressable>
          </View>
          <View style={this.style.Table}>
            <Video
              style={{ width: "100%", height: 300, borderColor: "pink", borderStyle: "solid", borderWidth: 1, borderRadius: 5 }}
              source={{
                uri: 'https://cdn.videvo.net/videvo_files/video/premium/2021-04/large_watermarked/210329_09_Bali_4k_005_preview.mp4',
              }}
              resizeMode="contain"
              isLooping
              useNativeControls
              isMuted={true}
              onPlaybackStatusUpdate={status => this.setState({ status: status })}
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
      : <App parent={this}></App>;
  }

}

export default withNavigation(ToochPage);