import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const Page2 = ({ selected, setSelected, pageChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timingdetails}>
        <Text style={styles.date}>
          {selected.date}{selected.suffix} {selected.month}
        </Text>
        <Text style={styles.time}>
          {selected.period}
        </Text>
      </View>
      <Image source={{ uri: `http://11.12.34.113:8000${selected.image}` }} style={{ width: '100%', height: 240 }}></Image>
      <View>
        <View style={styles.absentheader}>
          <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24 }]}>Absentee</Text>
          <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24, color: '#D66969' }]}>{selected.info.length}</Text>
        </View>
        <View>{selected.info.map((details, i) => <View style={[styles.absentTable, { backgroundColor: i % 2 ? '#D7D7D7' : '#E8E8E8' }]}><Text style={[{ fontFamily: "Poppins_600SemiBold" }]}>{details.id}</Text><Text style={[{ fontFamily: "Poppins_600SemiBold" }]}>{details.name}</Text><TouchableOpacity style={styles.button}></TouchableOpacity></View>)}</View>
      </View>
      <TouchableOpacity style={styles.goBack} onPress={() => { pageChange(1); setSelected({ year: null, month: null, date: null, suffix: null, period: null, image: null, time: [], info: [] }) }}><Text style={[{ fontFamily: "Poppins_600SemiBold", color: "#FFFFFF", textAlign: 'center' }]}>Go Back</Text></TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 35,
  },
  date: {
    fontFamily: 'Poppins_700Bold',
    color: "#D66969",
    fontSize: 36,
  },
  time: {
    color: "#2D3C43",
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  absentheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  absentTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#E8E8E8",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    width: 15,
    height: 15,
    borderColor: '#20242D',
    borderWidth: 1,
    borderRadius: 4,
  },
  goBack: {
    alignSelf: 'center',
    width: 110,
    padding: 10,
    backgroundColor: "#D66969",
    borderRadius: 5,
  },
});

export default Page2;
