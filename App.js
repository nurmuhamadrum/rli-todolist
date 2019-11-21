import React from 'react';
import {Provider} from 'react-redux';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';

import store from './src/_store';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({tintColor}) => (
        <Icon name="align-left" color={tintColor} size={24} />
      ),
      tabBarOptions: {activeTintColor: '#1B885D'},
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({tintColor}) => (
        <Icon name="user-circle" color={tintColor} size={24} />
      ),
      tabBarOptions: {activeTintColor: '#1B885D'},
    },
  },
});

const MyScreen = createSwitchNavigator({
  RouteOne: Login,
  RouteTwo: TabNavigator,
});

const RootNavigation = createAppContainer(MyScreen);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
