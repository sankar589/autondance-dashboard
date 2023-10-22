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
  const [page, setPage] = useState(1);
  const [calendarData, setCalendarData] = useState(null);
  const [selected, setSelected] = useState({ year: null, month: null, date: null, suffix: null, period: null, image: null, time: [], info: [] });

  useEffect(() => {
    (async function prepare() {
      try {
        await Font.loadAsync({
          Poppins_600SemiBold,
          Poppins_700Bold,
          Poppins_400Regular,
        });
        await loadCalendar();
      } catch (e) {
        console.log("Error onMount");
        console.log(e);
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
    setCalendarData(data["data"]);
  }

  const pickPageToRender = () => {
    if (page === 1) {
      return <Home selected={selected} setSelected={setSelected} pageChange={(pageNum) => setPage(pageNum)} data={calendarData} />;
    }
    if (page === 2) {
      return <Summary selected={selected} setSelected={setSelected} pageChange={(pageNum) => setPage(pageNum)} />;
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
