import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";

function generateMonthTable(month, year) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    month = months.indexOf(month)

    const si = new Date(year, month, 1).getDay()
    const noOfDays = new Date(year, month+1, 0).getDate()
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

function Calendar({ month, year, markedDates, onClick }) {
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthTable = generateMonthTable(month, year);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{month}</Text>
            <View style={styles.header}>
                {headers.map(header => (
                    <Text key={header} style={Platform.OS === 'ios' ? styles.iosHeaderCell : styles.headerCell}>
                        {header}
                    </Text>
                ))}
            </View>

            <View style={styles.calendar}>
                {monthTable.map((row, i) => {
                    return (
                        <View key={i} style={styles.row}>
                            {row.map((cell, j) => {
                                return markedDates.find(({ date }) => date == cell) ? 
                                    <TouchableOpacity key={`${i}-${j}`} style={styles.button} onPress={_ => onClick(cell)}>
                                        <Text style={[Platform.OS === 'ios' ? styles.iosCell : styles.cell, { fontFamily: "Poppins_700Bold" }]}>
                                            {cell}
                                        </Text>
                                        <View style={Platform.OS === 'ios' ? styles.iosDot : styles.dot}></View>
                                    </TouchableOpacity>
                                    :
                                    <Text key={i * 10 + j} style={Platform.OS === 'ios' ? styles.iosCell : styles.cell}>{cell}</Text>
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
    calendar: {
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
