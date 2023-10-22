import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Page2 = () => {
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
      <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${selected.image}` }} style={{ width: '100%', height: 240 }}></Image>
      <View>
        <View style={styles.absentheader}>
          <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24 }]}>Absentee</Text>
          <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24, color: '#D66969' }]}>{selected.info.length}</Text>
        </View>
        <ScrollView>
          {selected.info.map((details, i) => (
            <View key={i} style={[styles.absentTable, { backgroundColor: i % 2 ? '#D7D7D7' : '#E8E8E8' }]}>
              <View style={styles.absentInfo}>
                <Text style={[{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }]}>{details.id}</Text>
                <Text style={[{ fontFamily: "Poppins_600SemiBold", flex: 1, fontSize: 16 }]}>{details.name}</Text>
              </View>
              <CheckBox
                value={selectedItems[i]}
                onValueChange={() => handleSelection(i)}
                style={styles.button}
              />
            </View>))
          }</ScrollView>
      </View>
      <TouchableOpacity style={styles.goBack} onPress={() => { pageChange(1); setSelected({ year: null, month: null, date: null, suffix: null, period: null, image: null, time: [], info: [] }) }}><Text style={[{ fontFamily: "Poppins_600SemiBold", color: "#FFFFFF", textAlign: 'center' }]}>Go Back</Text></TouchableOpacity>
    </View >
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

export default Page2;
