import React, { useState, useContext } from "react";
import { StoreData } from "../../../../App";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Text } from "react-native-paper";
import InputFieldComp from "../../../ReuseAbleComponents/InputFieldComp";
import ButtonComp from "../../../ReuseAbleComponents/ButtonComp";
import {
  auth,
  signInWithEmailAndPassword,
  collection,
  db,
  where,
  getDocs,
  query,
  onAuthStateChanged,
} from "../../../../Firebase/FirebaseConfig";

const LoginComp = ({ navigation }) => {
  const { getUserData } = useContext(StoreData);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [BtnLoader, setBtnLoader] = useState(false);
  const [userid, setuserid] = useState(null);

  async function login() {
    await signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        setBtnLoader(true);
        // Signed in
        const user = userCredential.user;
        setuserid(user.uid);
        // console.log(user);
      })
      .then(() => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const q = query(
              collection(db, "Registration"),
              where("registerUserId", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            // console.log("query console", querySnapshot);

            querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
              getUserData(doc.data());
              if (doc.data().registrationCompleted === true) {
                ToastAndroid.show("Login Sucefully", ToastAndroid.SHORT);
                navigation.navigate("ResturantmainScreen");
                // console.log("true condition matched");
                setBtnLoader(false);
                setEmail(" ");
                setPassword(" ");
              } else {
                navigation.navigate("ResturantRegistrationForm");
                ToastAndroid.show("Login Sucefully", ToastAndroid.SHORT);
                // console.log("go to seller home page");
                // console.log("another condition matched");
                setBtnLoader(false);
                setEmail(" ");
                setPassword(" ");
              }
            });
          } else {
            // User is signed out
            // ...
          }
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setBtnLoader(false);
      });
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <View style={styles.upperPart}>
        <Image
          source={require("../../../../Asset/logo.png")}
          style={styles.logo}
        />
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          Login 
        </Text>
      </View>
      <View style={styles.middlePart}>
        <InputFieldComp
          //   placeholder="Enter Your Email"
          label="Email"
          mode="outlined"
          text={Email}
          onChangeTextFunction={(text) => {
            setEmail(text);
          }}
          borderColor="#cf0662"
          outlineClr="black"
        />
        <InputFieldComp
          //   placeholder="Enter Your Password"
          label="Password"
          mode="outlined"
          text={Password}
          onChangeTextFunction={(text) => {
            setPassword(text);
          }}
          borderColor="#cf0662"
          outlineClr="black"
        />
      </View>
      <View
        style={{
          width: Dimensions.get("window").width,
          paddingHorizontal: Dimensions.get("window").width / 10,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <ButtonComp
          btnValue="Login as Admin"
          onPressAction={login}
          btnStructure="contained"
          loadingBoleanValue={BtnLoader}
          btnColr="#cf0662"
          btnStyle={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        />
        <ButtonComp
          btnValue="Don't Have An Account? Signup"
          onPressAction={() => {
            navigation.navigate("ResturantSignup");
          }}
          btnStructure="text"
          loadingBoleanValue={false}
          btnColr="#cf0662"
          btnStyle={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        />
      </View>
    </ScrollView>
  );
};

export default LoginComp;

const styles = StyleSheet.create({
  upperPart: {
    // flex: 0.4,
    justifyContent: "flex-end",
    alignContent: "center",
    width: Dimensions.get("window").width,
    paddingVertical: 10,
  },
  middlePart: {
    paddingHorizontal: 20,
    // flex: 0.6,
    justifyContent: "center",
    alignContent: "center",
    width: Dimensions.get("window").width,
  },

  logo: {
    height: 80,
    width: Dimensions.get("screen").width,
  },
});
