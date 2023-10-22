import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";

// TODO:
// 1. define platform specfic style for font-size and bottom
// 2. Scrollable instead of View

function generateMonthTable(startDay, noOfDays) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const si = days.indexOf(startDay);
    const n = 7;

    let d = 1;
    let table = [];

    let row = [];
    for (let i = 0; i < si; i++) {
        row.push(" ");
    }
    while (row.length < n) {
        row.push(d);
        ++d;
    }
    table.push(row);

    while (noOfDays - d > n) {
        row = [];
        while (row.length < n) {
            row.push(d);
            ++d;
        }
        table.push(row);
    }

    row = [];
    while (d <= noOfDays) {
        row.push(d);
        ++d;
    }
    while (row.length < n) {
        row.push(" ");
    }
    table.push(row);

    return table;
}

function Calendar({ monthName, startDay, noOfDays, availableDates, onClick }) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthTable = generateMonthTable(startDay, noOfDays);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{monthName}</Text>
            <View style={styles.header}>
                {days.map((day) => (
                    <Text style={Platform.OS === 'ios' ? styles.iosHeaderCell : styles.headerCell} key={day}>
                        {day}
                    </Text>
                ))}
            </View>
            <View style={styles.grid}>
                {monthTable.map((row, i) => {
                    const rowKey = monthName + '-r' + i;
                    return (
                        <View key={rowKey} style={styles.row}>
                            {row.map((cell, i) => {
                                let isAvailable = availableDates.indexOf(cell) != -1;
                                return !isAvailable ? (
                                    <Text style={Platform.OS === 'ios' ? styles.iosCell : styles.cell}>{cell}</Text>
                                ) : (
                                    <TouchableOpacity style={styles.button} onPress={(_) => onClick(cell)}>
                                        <Text style={[Platform.OS === 'ios' ? styles.iosCell : styles.cell, { fontFamily: "Poppins_700Bold" }]}>
                                            {cell}
                                        </Text>
                                        <View style={Platform.OS === 'ios' ? styles.iosDot : styles.dot}></View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        rowGap: 18,
    },
    title: {
        fontFamily: "Poppins_700Bold",
        fontSize: 28,
        textAlign: "left",
        color: "#D66969",
    },
    header: {
        flexDirection: "row",
        columnGap: 12,
    },
    headerCell: {
        flex: 1,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 14,
        textAlign: "right",
        color: "#1F252D",
    },
    iosHeaderCell: {
        flex: 1,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        textAlign: "right",
        color: "#1F252D",
    },
    grid: {
        rowGap: 20,
    },
    row: {
        flexDirection: "row",
        columnGap: 12,
    },
    cell: {
        flex: 1,
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        textAlign: "right",
        color: "#1F252D",
    },
    iosCell: {
        flex: 1,
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        textAlign: "right",
        color: "#1F252D",
    },
    button: {
        flex: 1,
        position: "relative",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 30,
        backgroundColor: "#1F252D",
        position: "absolute",
        bottom: "-30%",
        left: "70%",
    },
    iosDot: {
        width: 6,
        height: 6,
        borderRadius: 30,
        backgroundColor: "#1F252D",
        position: "absolute",
        bottom: "-50%",
        left: "70%",
    }
});

export default Calendar;
