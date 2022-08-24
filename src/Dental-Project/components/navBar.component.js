import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon,Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './homepage.component';
import { InfoPage } from './infopage.component';

const { Navigator, Screen } = createBottomTabNavigator();

const TopBar = ({navigation, state}) =>{
  const AwardIcon = (props) => (
    <Icon {...props} name='award'/>
  );
  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out'/>
  );
  const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

  const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );
  return(
      <React.Fragment>
        <TopNavigationAction icon={AwardIcon}/>
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}>
          <MenuItem accessoryLeft={PersonIcon} title='Profile'/>
        </OverflowMenu>
    </React.Fragment>
  );
};


const Navbar = ({navigation, state}) =>{
  const HomeIcon = (props) => (
    <Icon {...props} name={state.index == 0 ? 'home' : 'home-outline'} fill={state.index == 0 ? '#5DB782' : '#CBFFD1'}/>
  );
  
  const InfoIcon = (props) => (
    <Icon {...props} name={state.index == 1 ? 'info' : 'info-outline'} fill={state.index == 0 ? '#D5F1FF' : '#87B2DB'}/>
  );
  return(
    <BottomNavigation
    style = {styles.bottomNavigation}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon ={HomeIcon}/>
      <BottomNavigationTab icon ={InfoIcon}/>
  </BottomNavigation>
  );
  
};
  const TabNavigator = () => (
    <Navigator tabBar={props => <Navbar {...props} />}>
      <Screen name='Home' component={HomeScreen}/>
      <Screen name='Info' component={InfoPage}/>
    </Navigator>
  );

  export const AppNavigator = () => (
    <NavigationContainer>
      <Layout style={styles.topNav} level='1'>
      <TopNavigation
        alignment='Left'
        title='Dental App'
        accessoryRight={TopBar}
      />
    </Layout>
      <TabNavigator/>
    </NavigationContainer>
  );

const styles = StyleSheet.create({
  bottomNavigation:{
    position: 'absolute',
    bottom:0
  },
  topNav: {
    marginTop:30,
    fontSize:50
  },
  
})