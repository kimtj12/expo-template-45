import React, { useContext, useMemo, useState, useCallback, useRef } from "react";
import { AuthContext } from "../provider/AuthProvider";
import AuthStack from "../screens/authStack";
import * as SplashScreen from "expo-splash-screen";
import MainTabBar from "./MainTabBar";
import * as Font from "expo-font";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
import { useToast } from "native-base";
// import { useColorScheme } from "react-native";

export default function AppNavigator() {
  // const scheme = useColorScheme();
  const toast = useToast();
  const { isInitialized, isLoggedIn, onAppStart } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("noti list", notification.request.content);

      toast.show({
        title: notification.request.content.title,
        description: notification.request.content.body,
        placement: "top",
      });
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("tap", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
