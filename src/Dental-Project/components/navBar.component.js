import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './homepage.component';
import { InfoPage } from './infopage.component';
import { QuizScreen } from './quizpage.component';
import { QuizGame } from './quizgame.component';


const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

const TopBar = () => {
  const AwardIcon = (props) => (
    <Icon {...props} name='award' fill ="#D4AF37"/>
  );

  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
  );

  const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

  const PersonIcon = (props) => (
    <Icon {...props} name='person-outline' />
  );

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigation = useNavigation();

  const navigateAchievements = () => {
    navigation.navigate('Info');
  }

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );



  return(
      <React.Fragment>
        <TopNavigationAction icon={AwardIcon} onPress={navigateAchievements}/>
        {/* <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}>
          <MenuItem accessoryLeft={PersonIcon} title='Profile'/>
        </OverflowMenu> */}
        <TopNavigationAction icon={PersonIcon} onPress={navigateAchievements}/>
    </React.Fragment>
  );
};


const Navbar = ({ navigation, state }) => {
  const HomeIcon = (props) => (
    <Icon {...props} name={state.index == 0 ? 'home' : 'home-outline'} fill={state.index == 0 ? '#5DB782' : '#CBFFD1'} />
  );
  const InfoIcon = (props) => (
    <Icon {...props} name={state.index == 1 ? 'info' : 'info-outline'} fill={state.index == 0 ? '#D5F1FF' : '#87B2DB'} /> );

  const QuizIcon = (props) => (
    <Icon {...props} name={state.index == 3 ? 'quiz' : 'question-mark-circle-outline'} fill={state.index == 0 ? '#F40000' : '#DFF400'} />
  )
  return (
    <BottomNavigation
      style={styles.bottomNavigation}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={InfoIcon} />
      <BottomNavigationTab icon={QuizIcon} />
    </BottomNavigation>
  );

};
const TabNavigator = () => (
  <Navigator tabBar={props => <Navbar {...props} />} screenOptions={{ headerShown: false }} topNav={props => <TopBar{...props} />}>
    <Screen name='Home' component={HomeScreen} />
    <Screen name='Info' component={InfoPage} />
    <Screen name ='Daily' component ={QuizGame}/>
    <Screen name='Quiz' component={QuizScreen} />
    
  </Navigator>
);

export const AppNavigator = () => (
  
  <NavigationContainer>
    <Layout style={styles.topNav} level='1'>
      <TopNavigation
        title='Dental App'
        accessoryRight={TopBar}
      />
    </Layout>
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    bottom: 0
  },
  topNav: {
    marginTop:0
  },

})