import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import bg from "./assets/bg.jpeg";
import Cell from "./src/components/Cell";

const pustaMapa = [
  ["", "", ""], 
  ["", "", ""],
  ["", "", ""],
];

const kopiaArray = (original) => {
  
  console.log(original);
  const copy = original.map((arr) => {
    return arr.slice();
  });
  console.log(copy);
  return copy;
};

export default function App() {
  const [map, setMapa] = useState(pustaMapa);
  const [obecnaTura, setObecnaTura] = useState("x");
  const [trybGry, setTrybGry] = useState("BOT");

  useEffect(() => {
    if (obecnaTura === "o" && trybGry !== "2 graczy") {
      turaBota();
    }
  }, [obecnaTura, trybGry]);

  useEffect(() => {
    const winner = getZwyciezca(map);
    if (winner) {
      zwyciezca(winner);
    } else {
      komorkaState();
    }
  }, [map]);

  const onPress = (rzadIndeks, kolIndeks) => {
    if (map[rzadIndeks][kolIndeks] !== "") {
      Alert.alert("Pozycja zajęta");
      return;
    }

    setMapa((istniejacaMapa) => {
      const aktualnaMapa = [...istniejacaMapa];
      aktualnaMapa[rzadIndeks][kolIndeks] = obecnaTura;
      return aktualnaMapa;
    });

    setObecnaTura(obecnaTura === "x" ? "o" : "x");
  };

  const getZwyciezca = (wygranaMapa) => {
   //rzedy 
    for (let i = 0; i < 3; i++) {
      const rzadXWygrywa = wygranaMapa[i].every((cell) => cell === "x");
      const rzadOWygrywa = wygranaMapa[i].every((cell) => cell === "o");

      if (rzadXWygrywa) {
        return "x";
      }
      if (rzadOWygrywa) {
        return "o";
      }
    }

    //kolumny
    for (let k = 0; k < 3; k++) {
      let kolXWygrywa = true;
      let kolOWygrywa = true;

      for (let r = 0; r < 3; r++) {
        if (wygranaMapa[r][k] !== "x") {
          kolXWygrywa = false;
        }
        if (wygranaMapa[r][k] !== "o") {
          kolOWygrywa = false;
        }
      }

      if (kolXWygrywa) {
        return "x";
      }
      if (kolOWygrywa) {
        return "o";
      }
    }

    // przekatne
    let przek1OWygrywa = true;
    let przek1XWygrywa = true;
    let przek2OWygrywa = true;
    let przek2XWygrywa = true;
    for (let i = 0; i < 3; i++) {
      if (wygranaMapa[i][i] !== "o") {
        przek1OWygrywa = false;
      }
      if (wygranaMapa[i][i] !== "x") {
        przek1XWygrywa = false;
      }

      if (wygranaMapa[i][2 - i] !== "o") {
        przek2OWygrywa = false;
      }
      if (wygranaMapa[i][2 - i] !== "x") {
        przek2XWygrywa = false;
      }
    }

    if (przek1OWygrywa || przek2OWygrywa) {
      return "o";
    }
    if (przek1XWygrywa || przek2XWygrywa) {
      return "x";
    }
  };

  const komorkaState = () => {
    if (!map.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert(`Remis`, `Spróbuj jeszcze raz!`, [
        {
          text: "Od nowa",
          onPress: resetGry,
        },
      ]);
    }
  };

  const zwyciezca = (gracz) => {
    Alert.alert(`Huraaaaa...!!!`, `Gracz ${gracz} wygrał`, [
      {
        text: "Od nowa",
        onPress: resetGry,
      },
    ]);
  };

  const resetGry = () => {
    setMapa([
      ["", "", ""], 
      ["", "", ""], 
      ["", "", ""], 
    ]);
    setObecnaTura("x");
  };

  const turaBota = () => {
    
    const mozliweUstawienia = [];
    map.forEach((row, rzadIndeks) => {
      row.forEach((komorka, kolIndeks) => {
        if (komorka === "") {
          mozliweUstawienia.push({ rzad: rzadIndeks, kolumna: kolIndeks });
        }
      });
    });

    let wybierzOpcje;

    if (trybGry === "BOT") {
     
      mozliweUstawienia.forEach((mozliwyWybor) => {
        const kopiaMapy = kopiaArray(map);

        kopiaMapy[mozliwyWybor.rzad][mozliwyWybor.kolumna] = "o";

        const winner = getZwyciezca(kopiaMapy);
        if (winner === "o") {
          
          wybierzOpcje = mozliwyWybor;
        }
      });

      if (!wybierzOpcje) {
        
        mozliweUstawienia.forEach((mozliwyWybor) => {
          const kopiaMapy = kopiaArray(map);

          kopiaMapy[mozliwyWybor.rzad][mozliwyWybor.kolumna] = "x";

          const winner = getZwyciezca(kopiaMapy);
          if (winner === "x") {
            
            wybierzOpcje = mozliwyWybor;
          }
        });
      }
    }

    
    if (!wybierzOpcje) {
      wybierzOpcje =
        mozliweUstawienia[Math.floor(Math.random() * mozliweUstawienia.length)];
    }

    if (wybierzOpcje) {
      onPress(wybierzOpcje.rzad, wybierzOpcje.kolumna);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
        <Text
          style={{
            fontSize: 48,
            color: "#3F48CC",
            position: "absolute",
            top: 100,
          }}
        >
          {obecnaTura.toUpperCase()}
        </Text>
        <View style={styles.map}>
          {map.map((row, rzadIndeks) => (
            <View key={`row-${rzadIndeks}`} style={styles.row}>
              {row.map((cell, kolIndeks) => (
                <Cell
                  key={`row-${rzadIndeks}-col-${kolIndeks}`}
                  cell={cell}
                  onPress={() => onPress(rzadIndeks, kolIndeks)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.buttons}>
          <Text
            onPress={() => setTrybGry("2 graczy")}
            style={[
              styles.button,
              { backgroundColor: trybGry === "2 graczy" ? "#4F5686" : "#202466",
               borderRadius: 10
              },
            ]}
          >
            Gra z kumplem
          </Text>
          <Text
            onPress={() => setTrybGry("BOT")}
            style={[
              styles.button,
              {
                backgroundColor:
                  trybGry === "BOT" ? "#4F5686" : "#202466",
                  borderRadius: 10,
              },
            ]}
          >
            Gra z botem
          </Text>
          
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
    justifyContent: "center",
    
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 15,
  },
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 16,
    backgroundColor: "grey",
    padding: 10,
    paddingHorizontal: 15,
  },
});
