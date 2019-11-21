import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Fonts} from '../configs/utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFunction = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <LinearGradient colors={['#207561', '#589167']} style={style.container}>
        <StatusBar backgroundColor="#1f6650" barStyle="light-content" />
        <View style={style.title}>
          <Icon name="align-left" color={'#fafafa'} size={100} />
          <Text style={style.titleApp}>MY TODO LIST</Text>
          <Text style={style.subTitleApp}>LET'S MAKE A TODO LIST TODAY!</Text>
        </View>
        <View>
          <TouchableOpacity
            style={style.button}
            onPress={() => this.handleFunction()}>
            <Text style={style.loginText}>MASUK</Text>
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
  title: {
    alignItems: 'center',
    paddingTop: 150,
  },
  titleApp: {
    fontSize: 50,
    color: '#fafafa',
    fontFamily: Fonts.PoppinsBold,
    marginBottom: 10,
  },
  subTitleApp: {
    fontSize: 20,
    color: '#fafafa',
    fontFamily: Fonts.Poppins,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    borderRadius: 30,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
    fontFamily: Fonts.PoppinsBold,
  },
});
