import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { AppLoading } from "expo";
// import AppLoading from "expo-app-loading";

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";

const initialState = {
  name: "",
  password: "",
};

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "KleeOne-Regular": require("./fonts/KleeOne-Regular"),
//   });
// };
const loadApplication = async () => {
  await Font.loadAsync({
    "KleeOne-Regular": require("./assets/fonts/KleeOne-Regular.ttf"),
  });
};

export default function App() {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [isFontsReady, setIsFontsReady] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  // const onLogin = () => {
  //   Alert.alert("Credentials", `${name} + ${password}`);
  // };

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };
  const keyboardHideInput = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
    setName("");
    setPassword("");
  };

  if (!isFontsReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsFontsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isKeyboardShow ? 20 : 100,
              }}
            >
              {/* //!!! */}
              <View style={styles.title}>
                <Text style={styles.text}>React Native 0.71</Text>
              </View>

              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Username"
                style={styles.input}
                onFocus={() => setIsKeyboardShow(true)}
              />
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                onFocus={() => setIsKeyboardShow(true)}
              />

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                // onPress={onLogin}
                onPress={keyboardHideInput}
              >
                <Text style={styles.btnTitle}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 40,
  },
  text: {
    color: "red",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "KleeOne-Regular",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
  },
  btn: {
    alignItems: "center",
    padding: 7,
    marginHorizontal: 30,
    borderRadius: 5,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#1e90ff",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
  },
});
