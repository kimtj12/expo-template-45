import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "native-base";
import MyScreen from "./MyScreen";
import Settings from "./Settings";
// import UserUpdate from "./UserUpdate";

const Stack = createStackNavigator();
const MyStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          color: colors.primary["500"],
          fontWeight: "bold",
        },
        headerBackTitle: " ",
        headerTintColor: colors.primary["500"],
      }}
    >
      <Stack.Screen
        name="MyScreen"
        component={MyScreen}
        options={{
          title: "마이페이지",
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "설정",
        }}
      />
      {/* <Stack.Screen
        name="UserUpdate"
        component={UserUpdate}
        options={{
          title: "개인정보 수정",
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default MyStack;
