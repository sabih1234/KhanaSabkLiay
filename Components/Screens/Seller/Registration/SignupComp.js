import React, { useState, useEffect } from "react";
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
  createUserWithEmailAndPassword,
  addDoc,
  collection,
  db,
} from "../../../../Firebase/FirebaseConfig";
import { ActivityIndicator } from "react-native-paper";

const SignupComp = ({ navigation }) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPasswnord] = useState("");
  const [cnic, setcncic] = useState("");
  const [BtnLoader, setBtnLoader] = useState(false);

  async function signup() {
    await createUserWithEmailAndPassword(auth, Email, Password, )
      .then((userCredential) => {
        setBtnLoader(true);
        // Signed in

        const user = userCredential.user;
        // console.log(user.uid);
        let uid = user.uid;
        try {
          const docRef = addDoc(collection(db, "Registration"), {
            fname: fname,
            lname: lname,
            email: Email,
            cnic: cnic,
            registerUserId: user.uid,
            registrationCompleted: false,
            registrationType: "seller",
          });
          ToastAndroid.show(
            "Your Resturant Has Been Registerd",
            ToastAndroid.SHORT
          );
          console.log("Document written with ID: ", docRef.id);
          setfname(" ");
          setlname(" ");
          setEmail(" ");
          setPassword(" ");
          setcncic(" ");
          setBtnLoader(false);
        } catch (e) {
          console.error("Error adding document: ", e);
          setBtnLoader(false);
        }
      })
      .then(() => {
        navigation.navigate("ResturantRegistrationForm");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setBtnLoader(false);
        // ..
      });
  }

  useEffect(() => {
    if (BtnLoader) {
      <ActivityIndicator
        style={{ justifyContent: "center", alignItems: "center" }}
        animating={true}
        color="red"
      />;
    }
  }, [BtnLoader]);

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
          Sign Up as User
        </Text>
      </View>
      <View style={styles.middlePart}>
        <InputFieldComp
          //   placeholder="Enter Your First Name"
          label="First Name"
          mode="outlined"
          text={fname}
          onChangeTextFunction={(text) => {
            setfname(text);
          }}
          outlineClr="black"
          borderColor="#cf0662"
        />
        <InputFieldComp
          //   placeholder="Enter Your Email"
          label="Last Name"
          mode="outlined"
          text={lname}
          onChangeTextFunction={(text) => {
            setlname(text);
          }}
          outlineClr="black"
          borderColor="#cf0662"
        />
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
        <InputFieldComp
          //   placeholder="Enter Your "
          label="CNIC"
          mode="outlined"
          text={cnic}
          onChangeTextFunction={(text) => {
            setcncic(text);
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
          btnValue="Register as User"
          onPressAction={signup}
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
          btnValue="Login"
          onPressAction={() => {
            navigation.navigate("ResturantLogin");
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

export default SignupComp;

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
