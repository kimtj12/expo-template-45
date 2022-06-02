import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "native-base";
import DevPlaceholderScreen from "../../components/navigation/DevPlaceholderScreen";

const Stack = createStackNavigator();
export default () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={DevPlaceholderScreen}
        options={{
          title: "신규 견적",
          headerShown: true,
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary["500"],
            fontWeight: "bold",
            fontFamily: "IBMPlex_SemiBold",
          },
          cardStyle: {
            backgroundColor: "#f8f9fa",
          },
        }}
      />
      {/* <AuthStack.Screen name="Register" component={Register} /> */}
      {/* <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
    </Stack.Navigator>
  );
};
