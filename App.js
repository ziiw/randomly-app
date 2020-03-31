import React from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  KeyboardAvoidingView, 
  Keyboard, 
  Platform,
  Text,
  View 
} from 'react-native';
import * as Font from 'expo-font';
import * as Facebook from 'expo-facebook'
import { signInWithFacebook } from './utils/auth'

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    text: ''
  }

  async componentDidMount() {
    await Font.loadAsync({
      'nunito-black': require('./assets/fonts/Nunito-Black.ttf'),
      'nunito-extra-bold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
      'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  onChangeText (text) {
    this.setState({text})
  }

  onSubmit () {
    console.log(this.state.text)
  }

  async login() {
    const resp = await signInWithFacebook()
    console.log(resp)
  }

  render() {
    const {fontLoaded, text} = this.state
    const onSubmit = this.onSubmit.bind(this)
    const onChangeText = this.onChangeText.bind(this)
    const login = this.login.bind(this)

    return fontLoaded ? (
      <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.titlesContainer}>
            <Text style={styles.header}>👋 Hey Clément,</Text>
            <Text style={styles.subTitle}>You still have 1 message</Text>
          </View>
          <TextInput
            style={styles.textInput}
            maxLength={100}
            onChangeText={text => onChangeText(text)}
            placeholder={'💬 Type your msg there...'}
            placeholderTextColor={'rgb(240, 240, 240)'}
            value={text}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.msgContainer} onPress={login}>
              <Text style={styles.btnMsg}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendContainer} onPress={onSubmit}>
              <Text style={styles.btn}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stgContainer}>
              <Text style={styles.btnStg}>Stg</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    ) : (<View></View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08D9D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center'
  },
  titlesContainer:{
    flex: 2,
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginTop: 60,
  },
  header: {
    fontSize: 36,
    marginBottom: 5,
    fontFamily: 'nunito-black'
  },
  subTitle: {
    fontSize: 25,
    fontFamily: 'nunito-extra-bold'
  },
  textInput: { 
    flex: 2,
    width: '100%', 
    color: 'rgb(240, 240, 240)', 
    fontSize: 30,
    paddingLeft: 24,
    fontFamily: 'nunito-regular'
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  msgContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 40,
    width: 65
  },
  sendContainer: {
    backgroundColor: "#FF235B",
    padding: 15,
    borderRadius: 40,
    width: 100
  },
  stgContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 40,
    width: 65
  },
  btnMsg: {
    color: '#FF235B',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'nunito-extra-bold'
  },
  btn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'nunito-extra-bold'
  },
  btnStg: {
    color: '#FF235B',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'nunito-extra-bold'
  }
});
