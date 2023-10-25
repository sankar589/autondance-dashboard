import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import CheckBox from 'expo-checkbox';

const Summary = ({ attendance, setAttendance, back }) => {
    const updateAttendance = async (student, isPresent) => {
        const options = {method: 'PATCH'};
        try {
            const newAttendance = [...attendance.attendance.filter(s => s.id != student.id), {...student, isPresent}]
            newAttendance.sort((a, b) => a.id.substr(a.id.length - 2) - b.id.substr(b.id.length - 2))
            setAttendance({...attendance, attendance: newAttendance})

            fetch(`${process.env.EXPO_PUBLIC_API_URL}/attendance?year=${attendance.year}&month=${attendance.month}&date=${attendance.date}&time=${attendance.time}&student_id=${student.id}&is_present=${isPresent}`, options)
        } catch (err) {
            console.error("Error occured during PATCH /attendance")
            console.error(err)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.date}>
                    {attendance.date} {attendance.month}
                </Text>
                <Text style={styles.time}>
                    {attendance.time}
                </Text>
            </View>
            <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${attendance.imageUri}` }} style={{ width: '100%', height: 240 }}></Image>
            <View>
                <View style={styles.studentHeader}>
                    <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24, color: '#1F252D' }]}>Absentees</Text>
                    <Text style={[{ fontFamily: "Poppins_700Bold", fontSize: 24, color: '#D66969' }]}>{attendance.attendance.filter(({ isPresent }) => !isPresent).length} out of {attendance.attendance.length}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: 228 }}>
                    {attendance.attendance.map((student, i) => (
                        <View key={student.id} style={[styles.absentTable, { backgroundColor: i % 2 ? '#D7D7D7' : '#E8E8E8' }]}>
                            <View style={styles.absentInfo}>
                                <Text style={[{ fontFamily: "Poppins_600SemiBold", fontSize: 16, color: '#1F252D' }]}>{student.id.substr(student.id.length - 2)}</Text>
                                <Text style={[{ fontFamily: "Poppins_600SemiBold", flex: 1, fontSize: 16, color: '#1F252D' }]}>{student.name}</Text>
                            </View>
                            <CheckBox
                                value={student.isPresent}
                                onValueChange={isPresent => updateAttendance(student, isPresent)}
                                style={styles.checkBox}
                            />
                        </View>))
                    }</ScrollView>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={back}><Text style={[{ fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#FFFFFF", textAlign: 'center' }]}>Go Back</Text></TouchableOpacity>
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
    studentHeader: {
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
        height: 40,
        alignItems: "center",
        flex: 1,
        flexDirection: 'row',
        columnGap: 32,
    },
    checkBox: {
        width: 25,
        height: 25,
        borderColor: '#20242D',
        borderWidth: 1,
        borderRadius: 4,
    },
    backButton: {
        alignSelf: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: "#D66969",
        borderRadius: 5,
    },
});

export default Summary;

