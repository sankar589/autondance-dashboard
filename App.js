import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

import {
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as Font from "expo-font";

import Home from "./components/Home";
import Summary from "./components/Summary";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();
export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [page, setPage] = useState("/home");
    const [calendar, setCalendar] = useState([]);
    const [attendance, setAttendance] = useState({year: null, month: null, date: null, time: null, attendance: null, imageUri: null})

    useEffect(() => {
        (async function() {
            try {
                await Font.loadAsync({
                    Poppins_400Regular,
                    Poppins_600SemiBold,
                    Poppins_700Bold,
                });
                await loadCalendar();
            } catch (err) {
                console.error("Error occured during loading fonts")
                console.error(err)
            } finally {
                setAppIsReady(true);
            }
        })();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    async function loadCalendar() {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/`, {

            method: "GET",
        });
        const data = await res.json();
        setCalendar(data["calendar"]);
    }

    function reset() {
        setAttendance({year: null, month: null, date: null, time: null, attendance: null, imageUri: null})
        setPage("/home")
    }

    const pickPageToRender = () => {
        if (page === "/home") {
            return <Home calendar={calendar} attendance={attendance} setAttendance={setAttendance} next={() => setPage("/summary")} />;
        } else if (page === "/summary") {
            return <Summary attendance={attendance} setAttendance={setAttendance} back={reset} />
        } else {
            return null;
        }
    };

    if (!appIsReady) {
        return null;
    }

    return (
        <LinearGradient
            colors={["#B2FFC8", "#C0E8DD", "#879DC3"]}
            style={styles.gradient}
            onLayout={onLayoutRootView}
        >
            {pickPageToRender()}
            <StatusBar style="dark" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },
});
