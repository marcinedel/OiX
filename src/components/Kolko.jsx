import React from "react";
import { View, StyleSheet } from "react-native";


const Kolko = () => {
  return (
    <View style={styles.kolko}/>
    
  );
};

const styles = StyleSheet.create({
  kolko: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,

    borderWidth: 9,
    borderColor: "darkblue",
  },
});

export default Kolko;
