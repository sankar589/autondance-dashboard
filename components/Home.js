import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Modal from "react-native-modal";
import Calendar from "./Calendar";

const Home = ({ calendar, attendance, setAttendance, next }) => {
    const [timings, setTimings] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSelectedDate = (year, month, _date, _timings) => {
        setAttendance({ year, month, date: _date, time: null, attendance: null });
        setTimings(_timings);
        setIsModalVisible(!isModalVisible);
    }

    async function handleSelectedTime(time) {
        try {
            const options = { method: 'GET' };
            const data = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/attendance?year=${attendance.year}&month=${attendance.month}&date=${attendance.date}&time=${time}`, options)
            const { attendance: _attendance, imageUri } = await data.json();

            setAttendance({ ...attendance, time, attendance: _attendance, imageUri })
            next()
        } catch (err) {
            console.error("Error occured during /attendance")
            console.error(err)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    calendar.map(({ year, months }) => {
                        return (
                            <View key={year} style={{ rowGap: 50 }}>
                                <Text style={styles.title}>{year}</Text>
                                <View style={{ rowGap: 50 }}>
                                    {
                                        months.map(({ month, dates }) => {
                                            return (
                                                <Calendar
                                                    key={`${year}-${month}`}
                                                    month={month}
                                                    year={year}
                                                    markedDates={dates}
                                                    onClick={(_date) => handleSelectedDate(year, month, _date, dates.find(({ date }) => date == _date).times)}
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
                    <Text style={styles.popTitle}>{attendance.date} {attendance.month}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.popHeader}>Available Timings</Text>
                        <Text style={styles.popHeader}>{timings.length}</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", }}>
                        {timings.map(time =>
                            <Pressable key={time} onPress={_ => handleSelectedTime(time)} style={styles.timeButton}>
                                <Image source={require('../assets/bulletin.png')} />
                                <Text style={styles.timeText}>{time}</Text>
                            </Pressable>
                        )}
                    </ScrollView>
                    <Pressable style={styles.closeButton} onPress={() => setIsModalVisible(false)}><Text style={styles.closeText}>Close</Text></Pressable>
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
    popTitle: {
        color: "#D66969",
        fontFamily: "Poppins_700Bold",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    popHeader: {
        fontFamily: "Poppins_600SemiBold",
        color: "#2D3C43",
        fontSize: 18,
        marginBottom: 10,
    },
    timeText: {
        marginLeft: 10,
        textDecorationLine: 'underline',
        fontFamily: "Poppins_400Regular",
    },
    timeButton: {
        flexDirection: 'row',
        padding: 10,
    },
    closeButton: {
        width: 110,
        padding: 10,
        backgroundColor: "#D66969",
        top: 40,
        left: 60,
        borderRadius: 5,
        marginBottom: 20
    },
    closeText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
    },
});

export default Home;
