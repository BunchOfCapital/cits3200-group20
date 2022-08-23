import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Card } from '@ui-kitten/components';
import { Image, StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';

import { AppNavigator } from './navigation.component';

import tooth from './assets/tooth(COPYRIGHT).jpg'


export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    <AppNavigator />
  </ApplicationProvider>
);