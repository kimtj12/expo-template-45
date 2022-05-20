import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";

import TabBarIcon from "../components/navigation/TabBarIcon";
import TabBarText from "../components/navigation/TabBarText";
import DevPlaceholderScreen from "../components/navigation/DevPlaceholderScreen";
import { useTheme } from "native-base";

import MyStack from "../screens/myStack";

// import HomeStack from "../screens/homeStack";
// import ChatStack from "../screens/chatStack";
// import PaymentStack from "../screens/paymentStack";
// import Profile from "../screens/mainStack/Profile";
// import Chat from "../screens/mainStack/Chat";
// import ReservationDetail from "../screens/mainStack/ReservationDetail";

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const isIos = Platform.OS === "ios";
  return (
    <Tabs.Navigator
      screenListeners={() => ({
        tabPress: () => isIos && Haptics.selectionAsync(),
      })}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // tabBarStyle: {
        //   borderTopColor: "transparent",
        // },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={DevPlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={"inbox"} />,
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="신규 견적" />,

          // tabBarIcon: ({ focused }) => (
          //   <Image
          //     style={{ height: 24, width: 24 }}
          //     source={
          //       focused ? require("./../../assets/img/tab/peer-active.png") : require("./../../assets/img/tab/peer.png")
          //     }
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="ChatStack"
        component={DevPlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={"hourglass"} />,
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="진행중 견적" />,
        }}
      />
      <Tabs.Screen
        name="PaymentStack"
        component={DevPlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={"calendar"} />,
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="시공 확정" />,
        }}
      />
      <Tabs.Screen
        name="MyStack"
        component={MyStack}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={"user"} />,
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="마이페이지" />,
        }}
      />
    </Tabs.Navigator>
  );
};

const Main = createStackNavigator();

const MainTabBar = () => {
  const { colors } = useTheme();

  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          color: colors.primary["500"],
          fontWeight: "bold",
        },
        headerTintColor: colors.primary["500"],
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Main.Screen name="MainTabs" component={MainTabs} />
      <Main.Screen
        name="ReservationDetail"
        component={DevPlaceholderScreen}
        options={{
          headerShown: true,
          title: " ",
          headerBackTitle: " ",
        }}
      />
      <Main.Screen
        name="Chat"
        component={DevPlaceholderScreen}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.title,
          // headerTitleAlign: "left",
          headerBackTitle: " ",
        })}
      />
    </Main.Navigator>
  );
};

export default MainTabBar;
