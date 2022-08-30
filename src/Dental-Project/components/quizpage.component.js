import React from 'react';
import { ApplicationProvider, Layout, Text, Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView, Button, ImageBackground, Pressable } from 'react-native';
import wallpaper from '../assets/7284061(1).png'
import cloud from '../assets/cloud.png';


export const QuizScreen = ({ navigation }) => {
    return (
        <Layout style={{ flex: 1, backgroundColor: "#FFFFF5" }}>
            <ImageBackground source={wallpaper} resizeMode="cover" style={{ flex: 1 }}>
                <Layout style={{ paddingBottom: 30, backgroundColor: "transparent", alignItems: "center", paddingTop: 10 }}>
                    <ImageBackground source={cloud} resizeMode="cover" style={{ width: '100%', height: undefined, alignSelf: "center" }}>
                        <Text level='1' style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', lineHeight: 100, color: 'white', fontSize: 30, textShadowColor: "#333333", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>Take a Quiz!</Text>
                    </ImageBackground>
                </Layout>


                {/* Main text below */}
                <ScrollView style={{ margin: 10 }}>
                    <Pressable style={styles.quizbutton} backgroundColor='#ffbed9'>
                        <Text>Hygiene Tips</Text>
                    </Pressable>
                    <Pressable style={styles.quizbutton} color='#ffbed9'>
                        <Text>Daily Quiz</Text>
                    </Pressable>
                    <Pressable style={styles.quizbutton} color='#ffbed9'>
                        <Text>Tooth Health</Text>
                    </Pressable>
                    <Pressable style={styles.quizbutton} color='#ffbed9'>
                        <Text>Gum Health</Text>
                    </Pressable>

                </ScrollView>
            </ImageBackground>
        </Layout >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FFFFF5'
    },
    quizbutton: {
        borderWidth: 2,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 50,
    }


});