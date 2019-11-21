import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../configs/utils';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LinearGradient colors={['#207561', '#589167']} style={style.container}>
        <StatusBar backgroundColor="#1f6650" barStyle="light-content" />
        <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
          <Icon
            name="user-circle"
            size={150}
            color={'white'}
            style={style.iconLogo}
          />
          <Text style={style.profileText}>MY PROFILE</Text>
          <TouchableOpacity
            style={style.button}
            onPress={() => BackHandler.exitApp()}>
            <Text style={style.loginText}>KELUAR</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileText: {
    fontSize: 40,
    color: 'white',
    fontFamily: Fonts.PoppinsBold,
  },
  iconLogo: {
    marginBottom: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff0000',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
    fontFamily: Fonts.PoppinsBold,
  },
});
