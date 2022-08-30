import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView , ImageBackground} from 'react-native';


export const CardNav = () =>{
    const navigation = useNavigation();

    return(
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