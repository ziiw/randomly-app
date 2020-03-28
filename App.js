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

  render() {
    const {fontLoaded, text} = this.state
    const onSubmit = this.onSubmit.bind(this)
    const onChangeText = this.onChangeText.bind(this)
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
            placeholder={'💬 Write your message...'}
            value={text}
          />
          <TouchableOpacity style={styles.btnContainer} onPress={onSubmit}>
            <Text style={styles.btn}>Send</Text>
          </TouchableOpacity>
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
  textInput: { 
    width: '100%', 
    color: 'rgb(240, 240, 240)', 
    fontSize: 30,
    paddingLeft: 24,
    fontFamily: 'nunito-regular'
  },
  inner: {
    width: '100%',
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  titlesContainer:{
    alignSelf: "flex-start"
  },
  header: {
    fontSize: 36,
    marginLeft: 24,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontFamily: 'nunito-black'
  },
  subTitle: {
    fontSize: 25,
    marginLeft: 24,
    marginBottom: 48,
    alignSelf: 'flex-start',
    fontFamily: 'nunito-extra-bold'
  },
  btnContainer: {
    backgroundColor: "#FF235B",
    padding: 15,
    borderRadius: 40,
    width: '90%'
  },
  btn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'nunito-extra-bold'
  }
});
