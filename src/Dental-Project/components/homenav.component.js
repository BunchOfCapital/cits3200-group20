import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView} from 'react-native';
import quizImg from '../assets/quizImage.jpeg'
import assessImg from '../assets/AssessmentImg.jpg'
import closeImg from '../assets/DentistImage.jpg'


export const CardNav = () =>{

    const HeaderQuiz = (props) => (
        <Layout {...props}>
          {/* <Image source={quizImg} style={{width:200, height:100}}/> */}
          <Text style={{alignSelf:"center"}}>Daily Quiz</Text> 
        </Layout>
      );

      const HeaderAssesment = (props) => (
        <Layout {...props}>
          {/* <Image source={quizImg} style={{width:200, height:100}}/> */}
          <Text style={{alignSelf:"center"}}>Assessment</Text> 
        </Layout>
      );

      const HeaderClosestD = (props) => (
        <Layout {...props}>
          {/* <Image source={quizImg} style={{width:200, height:100}}/> */}
          <Text style={{alignSelf:"center"}}>closest dentist</Text> 
        </Layout>
      );


    const navigation = useNavigation();

    return(
        <ScrollView horizontal = {true} showsHorizontalScrollIndicator={false} style={{flex:0.1}}>
            <Card header={HeaderQuiz} style={styles.cardSmall} status='danger'>
              {/* <Text style={{alignSelf:"center"}}>Daily Quiz</Text> */}
              <Image source={quizImg} style={{width:200, height:100}}/>
            </Card>
  
            <Card header={HeaderAssesment} style={styles.cardSmall} status='success'>
              {/* <Text> Check on your Assessment</Text> */}
              <Image source={assessImg} style={{width:200, height:100}}/>
            </Card>
  
            <Card header={HeaderClosestD} style={styles.cardSmall} status='info'>
              {/* <Text>Your closest dentist</Text> */}
              <Image source={closeImg} style={{width:200, height:100}}/>
            </Card>  
  
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 1,
        flex: 1,
        flexDirection: 'row'
      },
    
      cardSmall: {
        borderRadius: 15,
        height:200,
        elevation:5
      },
})