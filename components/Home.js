import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Modal from "react-native-modal";
import Calendar from "./Calendar";

const Home = ({ data }) => {

    const [selectedDate, setSelectedDate] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (date) => {
        setSelectedDate(date);
        setModalVisible(!isModalVisible);
    };

    const handleClick = (year, month, date) => {
        console.log(year, month, date);
    }

    return (
        <View style={styles.container}>
            <View>
                {
                    data.map(year => {
                        return (
                            <View style={{rowGap: 50}}>
                                <Text style={styles.title}>{year.year}</Text>
                                <View style={{rowGap: 50}}>
                                {
                                year.months.map(month => {
                                    return (
                                        <Calendar 
                                            monthName={month.month}
                                            startDay={month.startDay}
                                            noOfDays={month.noOfDays}
                                            availableDates={month.availableDates}
                                            onClick={(date) => handleClick(year.year, month.month, date)}
                                        />
                                    )
                                })
                                }
                                </View>
                            </View>
                        )
                    })
                }
            </View>

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
        padding: 40,
        paddingVertical: 64,
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 44,
        color: '#2B3C43',
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

export default Home;
