import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Modal from "react-native-modal";
import Calendar from "./Calendar";

const Home = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [suffix, setSuffix] = useState('');
    const [time, setTime] = useState([]);

    const toggleModal = () => {

        setModalVisible(!isModalVisible);
    };

    const handleClick = async (year, month, date) => {
        console.log(year, month, date);
        setSelectedDate(date);
        setSelectedMonth(month);
        const suffix = date % 10 === 1 && date !== 11 ? 'st' : date % 10 === 2 && date !== 12 ? 'nd' : date % 10 === 3 && date !== 13 ? 'rd' : 'th';
        setSuffix(suffix);
        // After fetch data

        // store it!
        // call toggleModal
        try {
            const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.1.0' } };

            await fetch(`http://11.12.34.113:8000/records?year=${year}&month=${month}&date=${date}`, options)
                .then(response => response.json())
                .then(response => { setTime(response.data), console.log(response.data) })
                .catch(err => console.error(err));
        }
        catch (error) {
            console.error('Error:', error);
        }
        console.log(time);
        toggleModal();
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    data.map(year => {
                        return (
                            <View style={{ rowGap: 50 }}>
                                <Text style={styles.title}>{year.year}</Text>
                                <View style={{ rowGap: 50 }}>
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
            </ScrollView>

            <Modal style={styles.popscreen} isVisible={isModalVisible}>
                <LinearGradient
                    colors={["#B2FFC8", "#C0E8DD", "#879DC3"]}
                    style={styles.popup}
                >
                    <Text style={styles.popDate}>{selectedDate}{suffix} {selectedMonth}</Text>
                    <Text style={styles.popText}>Availabe Records</Text>
                    <View>{time.map(period => <View style={styles.interval}><Image source={require('../assets/bulletin.png')}></Image><Text style={styles.intervalText}>{period}</Text></View>)}</View>
                    <TouchableOpacity style={styles.closebtn} onPress={() => toggleModal('')}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
                </LinearGradient>
            </Modal>
        </View >
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
        padding: 40,
        justifyContent: "flex-start",
    },
    popDate: {
        color: "#D66969",
        fontFamily: "Poppins_700Bold",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    popText: {
        fontFamily: "Poppins_600SemiBold",
        color: "#2D3C43",
        fontSize: 18,
        marginBottom: 10,
    },
    intervalText: {
        marginLeft: 10,
        textDecorationLine: 'underline',
        fontFamily: "Poppins_400Regular",
    },
    interval: {
        flexDirection: 'row',
        padding: 10,
    },
    closebtn: {
        width: 110,
        padding: 10,
        backgroundColor: "#D66969",
        top: 40,
        left: 60,
        borderRadius: 5,
    },
    closeText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
    },
});

export default Home;
