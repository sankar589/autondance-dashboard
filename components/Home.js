import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

const Page1 = ({ pageChange }) => {
  const september = {
    name: "September 2023",
    startDate: "2023-09-01",
  };

  const october = {
    name: "October 2023",
    startDate: "2023-10-01",
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (date) => {
    setSelectedDate(date);
    setModalVisible(!isModalVisible);
  };

  const theme = {
    textDayFontFamily: "Poppins_400Regular",
    textMonthFontFamily: "Poppins_700Bold",
    calendarBackground: "transparent",
    dayTextColor: "#000000",
    monthTextColor: "#D66969",
    textMonthFontSize: 24,
  };

  const markedDates = {
    "2023-09-15": { marked: true, dotColor: "black" }, // Highlight a specific date
  };
  return (
    <View style={styles.container}>
      <Calendar
        current={september.startDate}
        markedDates={markedDates}
        hideArrows={true}
        hideExtraDays={true}
        onDayPress={(day) => {
          if (markedDates[day.dateString]) {
            toggleModal(day.dateString);
          }
        }}
        theme={theme}
        style={{ marginBottom: 30 }}
      />

      <Calendar
        current={october.startDate}
        hideArrows={true}
        theme={theme}
        hideExtraDays={true}
        backgroundColor="transparent"
      />
      <Modal style={styles.popscreen} isVisible={isModalVisible}>
        <LinearGradient
          colors={["#B2FFC8", "#C0E8DD", "#879DC3"]}
          style={styles.popup}
        >
          <Text>Date: {selectedDate}</Text>
          <Text>Some information about this date.</Text>
          <TouchableOpacity onPress={() => toggleModal("")}>
            <Text>Close</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  popscreen: {
    flex: 1,
    alignItems: "center",
  },
  popup: {
    width: 300,
    height: 400,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page1;
