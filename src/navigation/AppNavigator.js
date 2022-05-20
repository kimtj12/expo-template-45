import React, { useContext, useMemo, useState, useCallback } from "react";
import { AuthContext } from "../provider/AuthProvider";
import AuthStack from "../screens/authStack";
import * as SplashScreen from "expo-splash-screen";
import MainTabBar from "./MainTabBar";
import * as Font from "expo-font";
import { View } from "react-native";
// import { useColorScheme } from "react-native";

export default function AppNavigator() {
  // const scheme = useColorScheme();
  const { isInitialized, isLoggedIn, onAppStart } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useMemo(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          IBMPlex_Thin: require("./../assets/fonts/IBMPlexSansKR-Thin.ttf"),
          IBMPlex_ExtraLight: require("./../assets/fonts/IBMPlexSansKR-ExtraLight.ttf"),
          IBMPlex_Light: require("./../assets/fonts/IBMPlexSansKR-Light.ttf"),
          IBMPlex_Text: require("./../assets/fonts/IBMPlexSansKR-Text.ttf"),
          IBMPlex_Regular: require("./../assets/fonts/IBMPlexSansKR-Regular.ttf"),
          IBMPlex_Medium: require("./../assets/fonts/IBMPlexSansKR-Medium.ttf"),
          IBMPlex_SemiBold: require("./../assets/fonts/IBMPlexSansKR-SemiBold.ttf"),
          IBMPlex_Bold: require("./../assets/fonts/IBMPlexSansKR-Bold.ttf"),
        });
        await onAppStart();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && isInitialized) await SplashScreen.hideAsync();
  }, [appIsReady, isInitialized]);

  if (!appIsReady || !isInitialized) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {!isLoggedIn && <AuthStack />}
      {isLoggedIn && <MainTabBar />}
    </View>
  );
}
