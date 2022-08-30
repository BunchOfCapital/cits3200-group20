import React from 'react';
import { ApplicationProvider, Layout, Text, Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';


export const QuizScreen = ({ navigation }) => {
    return (
        <Layout style={{ flex: 1, backgroundColor: "#FFFFF5" }}>
            <Text style={{ textAlign: 'center' }}>
                Welcome to the Quiz Page
            </Text>

        </Layout>
    );
};