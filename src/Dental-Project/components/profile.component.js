 import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from '../custom-theme.json';
import userData from '../Data/userData';


export const ProfilePage = () => {
  return (<Layout>
    <Card style={styles.card}>
      <Text style={{fontSize:18, fontWeight:"500"}}>Profile</Text>
      <Text>{userData.name + "\n" + userData.email + "\n" + (userData.isChild?"BABY":"BIG AND MANLY")}</Text>
    </Card>
  </Layout>);
}


const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        elevation: 5,
        width:"95%"
    },
});