import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const initialState = {
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
  });
};

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [iasReady, setIasReady] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/stars-on-night.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 150,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello again</Text>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
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
    justifyContent: "flex-end",
    // justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    borderRadius: 6,

    color: "#f0f8ff",
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "DMMono-Regular",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
    fontFamily: "DMMono-Regular",
  },
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  headerTitle: {
    fontSize: 30,
    color: "#f0f8ff",
    fontFamily: "DMMono-Regular",
  },
});
