import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useState } from "react";
import CheckBox from 'expo-checkbox';

const Summary = ({ selected, setSelected, pageChange }) => {
  const [selectedItems, setSelectedItems] = useState(selected.info.map(() => false));

  const handleSelection = (index) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);
  };

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
      <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${selected.image}` }} style={{ width: '100%', height: 240 }}></Image>
      <View>
        <View style={styles.absentheader}>
          <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24 }]}>Absentee</Text>
          <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24, color: '#D66969' }]}>{selected.info.length}</Text>
        </View>
        <ScrollView>
          {selected.info.map((details, i) => (
            <View key={details.id} style={[styles.absentTable, { backgroundColor: i % 2 ? '#D7D7D7' : '#E8E8E8' }]}>
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
    paddingVertical: 15,
  },
  absentInfo: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 32,
  },
  button: {
    width: 25,
    height: 25,
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

export default Summary;

