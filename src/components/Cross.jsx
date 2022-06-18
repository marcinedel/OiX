import React from "react";
import { View, StyleSheet } from "react-native";


const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine} />
      <View style={[styles.crossLine, styles.crossLineReversed]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cross: {
    flex: 1,
  },
  crossLine: {
    position: "absolute",
    left: "50%",
    width: 10,
    height: "80%",
    backgroundColor: "navy",
    borderRadius: 5,
    transform: [
      {
        rotate: "42deg",
      },
    ],
  },
  crossLineReversed: {
    transform: [
      {
        rotate: "-60deg",
      },
    ],
  },
});

export default Cross;
