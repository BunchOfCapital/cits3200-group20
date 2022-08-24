import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';

import { AppNavigator } from './components/navBar.component';
// import { AppNavigator } from './components/navigation.component';


// export function App() {
//   const [fontsLoaded] = useFonts({
//     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//   });
// }


export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);