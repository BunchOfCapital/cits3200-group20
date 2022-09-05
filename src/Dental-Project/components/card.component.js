import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text,Card,Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const DailyInfo = () =>{
    const navigation = useNavigation();
    
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
            onPress={() => navigation.navigate('QuizGame')}>
            LEARN MORE
          </Button>
        </Layout>
      );
      
    
    return(
    <Card style={styles.card} header={Header} footer={Footer} status ='success'>
        <Text>
            Smoking is bad for your health but you do it anyway because you're stressed depressed and you wonder if its
            worth it, but guess what you're worth it and failure makes you stronger
        </Text>
     </Card>
   
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        elevation: 5,
        width:"95%"
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      footerControl: {
        marginHorizontal: 2,
      },
})