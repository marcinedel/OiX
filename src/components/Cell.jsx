import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Cross from "./Cross";
import Kolko from"./Kolko";

const Cell = (props) => {
  const { cell, onPress } = props;
  return (
    <Pressable
      onPress={() => onPress()}
      style={styles.cell}
    >
      {cell === "o" && <Kolko />}
      {cell === "x" && <Cross />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    flex: 1,
  },
  
});

export default Cell;
