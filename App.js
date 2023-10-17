import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import Page1 from "./components/Home";
import Page2 from "./components/Popup";
import Page3 from "./components/Summary";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import {
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [page, setPage] = useState(3);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Poppins_600SemiBold,
          Poppins_700Bold,
          Poppins_400Regular,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const pickPageToRender = () => {
    if (page === 1) {
      return <Page1 pageChange={(pageNum) => setPage(pageNum)} />;
    }
    if (page === 2) {
      return <Page2 pageChange={(pageNum) => setPage(pageNum)} />;
    }
    if (page === 3) {
      return <Page3 pageChange={(pageNum) => setPage(pageNum)} />;
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
