import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Page3 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timingdetails}>
        <Text style={[{ fontFamily: "Poppins_700Bold" }, styles.date]}>
          18th October
        </Text>
        <Text style={[{ fontFamily: "Poppins_600SemiBold" }, styles.time]}>
          02:15 PM
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 35,
  },
  date: {
    color: "#D66969",
    fontSize: 36,
  },
  time: {
    color: "#2D3C43",
    fontSize: 16,
  },
});

export default Page3;
