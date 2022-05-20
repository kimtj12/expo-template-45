import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Join from "./Join";
import { useTheme } from "native-base";

// import Welcome from "./Welcome";
// import Join2 from "./join/Step2";
// import FindPassword from "./FindPassword";
// import FindUsername from "./FindUsername";

const Auth = createStackNavigator();

const AuthStack = () => {
  const { colors } = useTheme();
  const JOIN_OPTIONS = {
    headerShown: true,
    title: "회원가입",
    headerTitleStyle: {
      color: colors.primary["500"],
      fontWeight: "bold",
      fontFamily: "IBMPlex_SemiBold",
    },
    headerBackTitle: " ",
    headerTintColor: colors.primary["500"],
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
      <Auth.Screen name="Join" component={Join} options={JOIN_OPTIONS} />
      {/* <Auth.Screen name="Join2" component={Join2} options={JOIN_OPTIONS} />
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
