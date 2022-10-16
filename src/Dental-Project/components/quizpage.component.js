import React from 'react';
import { Layout, Text, } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View, ImageBackground, Pressable } from 'react-native';
import wallpaper from '../assets/7284061(1).png'
import cloud from '../assets/cloud.png';
import { useNavigation } from '@react-navigation/native';


export const QuizScreen = () => {
    const navigation = useNavigation();
    return (
        <Layout style={{ flex: 1, backgroundColor: "#FFFFF5" }}>
            <ImageBackground source={wallpaper} resizeMode="cover" style={{ flex: 1 }}>
                <Layout style={{ paddingBottom: 0, backgroundColor: "transparent", alignItems: "center", paddingTop: 10 }}>
                    <ImageBackground source={cloud} resizeMode="cover" style={{ width: '100%', height: 100, alignSelf: "center" }}>
                        <Text level='1' style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', lineHeight: 100, color: 'white', fontSize: 30, textShadowColor: "#333333", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>Take a Quiz!</Text>
                    </ImageBackground>
                </Layout>


                <ScrollView style={{ margin: 10 }}>
                    <Text>A range of quizzes that can be taken to enhance your knowledge! Each quiz has an assigned difficulty from 1-3. A level 1 quiz would indicate that it is suitable for a child and level 3 is suitable for an adult. </Text>

                    <View style={[styles.quizview]}>
                        <Pressable style={[styles.quizbutton, { backgroundColor: '#bac2ff' }]} onPress={() => navigation.navigate('Daily', { QuizName: 'DailyQuiz' })}>
                            <Text style={[styles.buttontext]}>Daily Quiz</Text>
                        </Pressable>
                        <Text style={[styles.descriptiontext]} > Varying level Quiz. Questions are randomly selected from all the quizzes</Text>
                    </View>
                    <View style={[styles.quizview]}>
                        <Pressable style={[styles.quizbutton, { backgroundColor: '#ffd7d1' }]} onPress={() => navigation.navigate('Daily', { QuizName: 'Hygiene' })} >
                            <Text style={[styles.buttontext]}>Hygiene Quiz</Text>
                        </Pressable>
                        <Text style={[styles.descriptiontext]} > Level 1 Quiz. Assesses your knowledge basic hygiene practices</Text>
                    </View>

                    <View style={[styles.quizview]}>
                        <Pressable style={[styles.quizbutton, { backgroundColor: '#feb3df' }]} onPress={() => navigation.navigate('Daily', { QuizName: 'ToothDecay' })}>
                            <Text style={[styles.buttontext]}>Tooth Decay</Text>
                        </Pressable>
                        <Text style={[styles.descriptiontext]} > Level 3 Quiz. Questions are related to what tooth decay is, possible causes and how to prevent it. </Text>
                    </View>

                    <View style={[styles.quizview]}>
                        <Pressable style={[styles.quizbutton, { backgroundColor: '#f6e0e2' }]} onPress={() => navigation.navigate('Daily', { QuizName: 'HowToFloss' })}>
                            <Text style={[styles.buttontext]}>How to floss</Text>
                        </Pressable>
                        <Text style={[styles.descriptiontext]} > Level 2 Quiz. This quiz will quiz you on appropriate flossing practices.</Text>
                    </View>

                    <View style={[styles.quizview, { paddingBottom: 60 }]}>
                        <Pressable style={[styles.quizbutton, { backgroundColor: '#c7dfff' }]} onPress={() => navigation.navigate('Daily', { QuizName: 'BrushingTeeth' })}>
                            <Text style={[styles.buttontext]}>Brushing Teeth</Text>
                        </Pressable>
                        <Text style={[styles.descriptiontext]} > Level 1 Quiz. This quiz will quiz you on appropriate brushing practices.</Text>
                    </View>

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
        borderRadius: 50,
        flexDirection: 'row',
    },

    buttontext: {
        fontWeight: 'bold',
        justifyContent: 'center',
    },

    descriptiontext: {
        paddingTop: 40,
        flexWrap: 'wrap',
        flex: 1,
        paddingLeft: 5,
    },

    quizview: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
    },
});
