import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
// import Welcome from "./Welcome";
// import Join1 from "./join/Step1";
// import Join2 from "./join/Step2";
// import FindPassword from "./FindPassword";
// import FindUsername from "./FindUsername";

const Auth = createStackNavigator();

const AuthStack = () => {
  const JOIN_OPTIONS = {
    headerShown: true,
    title: "스플 회원가입",
    headerTitleStyle: {
      color: "#6b38e1",
      fontWeight: "bold",
      fontFamily: "IBMPlex_SemiBold",
    },
    headerBackTitle: " ",
    headerTintColor: "#6b38e1",
    cardStyle: {
      backgroundColor: "white",
    },
  };
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="Login" component={Login} />
      {/* <Auth.Screen name="Join1" component={Join1} options={JOIN_OPTIONS} />
      <Auth.Screen name="Join2" component={Join2} options={JOIN_OPTIONS} />
      <Auth.Screen
        name="FindPassword"
        component={FindPassword}
        options={{
          headerShown: true,
          title: "비밀번호 찾기",
          headerTitleStyle: {
            color: "#6b38e1",
            fontWeight: "bold",
            fontFamily: "IBMPlex_SemiBold",
          },
          headerBackTitle: " ",
          headerTintColor: "#6b38e1",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Auth.Screen
        name="FindUsername"
        component={FindUsername}
        options={{
          headerShown: true,
          title: "아이디 찾기",
          headerTitleStyle: {
            color: "#6b38e1",
            fontWeight: "bold",
            fontFamily: "IBMPlex_SemiBold",
          },
          headerBackTitle: " ",
          headerTintColor: "#6b38e1",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      /> */}
    </Auth.Navigator>
  );
};

export default AuthStack;
