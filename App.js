import "react-native-reanimated";
import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import axios from "axios";
import { API } from "./src/config";
import { NativeBaseProvider, extendTheme, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
// import THEME from "./src/tui/Theme";
import { Platform } from "react-native";
import { Root as NotificationProvider } from "react-native-alert-notification";

axios.defaults.baseURL = API;
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const isIos = Platform.OS === "ios";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#efe5fd",
      100: "#d4bff9",
      200: "#b794f6",
      300: "#9965f4",
      400: "#7e3ff2",
      500: "#6002ee",
      600: "#5300e8",
      700: "#3d00e0",
      800: "#1c00db",
      900: "#0000d6",
    },
  },

  fontConfig: {
    IBMPlex: {
      100: { normal: "IBMPlex_Thin" },
      200: { normal: "IBMPlex_ExtraLight" },
      300: { normal: "IBMPlex_Light" },
      400: { normal: "IBMPlex_Medium" },
      500: { normal: "IBMPlex_Medium" },
      600: { normal: "IBMPlex_SemiBold" },
      700: { normal: "IBMPlex_SemiBold" },
      800: { normal: "IBMPlex_Bold" },
      900: { normal: "IBMPlex_Bold" },
    },
  },
  fonts: {
    heading: "IBMPlex",
    body: "IBMPlex",
    mono: "IBMPlex",
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: 8,
        paddingTop: isIos ? 3 : "14px",
        paddingBottom: isIos ? 3 : "14px",
      },
      sizes: {
        md: {
          _text: {
            fontSize: 16,
          },
        },
      },
    },
    Input: {
      baseStyle: ({ colorMode }) => {
        return {
          fontWeight: "bold",
          borderRadius: 8,
          paddingTop: isIos ? 4 : 3,
          paddingBottom: isIos ? 4 : 3,
          marginBottom: 4,
        };
      },
      defaultProps: {
        variant: "filled",
        fontSize: 14,
        autoCapitalize: "none",
      },
    },
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <NotificationProvider>
          {/* <NavigationContainer theme={THEME.light}> */}
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </NotificationProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
