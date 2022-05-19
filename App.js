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

const theme = extendTheme({
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

  primary: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E",
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: "md",
      },
      defaultProps: {
        colorScheme: "rose",
      },
    },
    Input: {
      baseStyle: {
        borderWidth: 3,
        borderRadius: "lg",
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingLeft: "16px",
        fontWeight: "bold",
        background: "#e9ecef",
      },
      defaultProps: {
        size: "md",
        // variant: "filled",
      },
    },
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        {/* <NavigationContainer theme={THEME.light}> */}
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
