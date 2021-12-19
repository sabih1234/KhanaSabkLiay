import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownComp = ({
  pickDropdownvalue,
  selectedLanguage,
  valueA,
  valueB,
}) => {
  return (
    <View style={{ marginVertical: 6, width: "70%" }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingVertical: 5,
          textAlign: "center",
          color: "#cf0662",
        }}
      >
        SELECT FOOD TYPE
      </Text>
      <View style={{ borderWidth: 2, borderColor: "#D3D3D3", borderRadius: 5 }}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={pickDropdownvalue}
        >
          <Picker.Item label={valueA} value="hm" color="#cf0662" />
          <Picker.Item label={valueB} color="#cf0662" value="rm" />
        </Picker>
      </View>
    </View>
  );
};

export default DropdownComp;

const styles = StyleSheet.create({});
