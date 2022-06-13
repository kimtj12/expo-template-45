import axios from "axios";
import * as Notifications from "expo-notifications";

export const registerNotification = async (user) => {
  let expoToken;
  let deviceToken;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  expoToken = (await Notifications.getExpoPushTokenAsync()).data;
  deviceToken = (await Notifications.getDevicePushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  console.log("expoToken => ", expoToken);

  try {
    await axios({
      url: "/users/" + user.id,
      method: "PUT",
      data: {
        expoToken,
        deviceToken,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
