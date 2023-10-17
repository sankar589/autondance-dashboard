import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Page1 = ({ pageChange }) => {
  return (
    <View style={styles.container}>
      <Text> page 1</Text>
      <TouchableOpacity onPress={() => this.props.pageChange(3)}>
        <Text>Go to page 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});

export default Page1;
