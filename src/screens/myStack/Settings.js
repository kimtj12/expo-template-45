import { Box, Button, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SectionItem from "../../components/SectionItem";
import * as Updates from "expo-updates";
import axios from "axios";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import TButton from "../../tui/TButton";

export default function Settings() {
  const handleUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        alert("최신버전");
      }
    } catch (e) {
      // handle or log error
      console.log(e);
    }
  };

  // HANDLE NOTIFICATION SETUP
  const setNotification = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    alert(existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return null;
    }

    token = await Notifications.getExpoPushTokenAsync();
    // console.log(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token.data;
  };

  const registerNotification = async () => {
    const token = await setNotification();
    // alert(token);
    try {
      const result = await axios({
        url: "/notification-expo/expotokens",
        method: "POST",
        data: {
          token,
          platform: Platform.OS,
        },
      });

      alert(result.data);
    } catch (error) {
      console.log("noti error", error.response.data.message);
      alert(token + error.response.data.message);
    }
  };

  return (
    <>
      <Box px={15}>
        {/* <Text>Settings</Text> */}
        {/* <SectionItem cat="버전" val="1.0" isLast /> */}
        {/* <SectionItem cat="Update Code" val={Updates.updateId ? Updates.updateId : "SEM 1.0"} /> */}
        {/* <SectionItem cat="채널" val={Updates.releaseChannel} /> */}
        {/* <TButton onPress={handleUpdate}>업데이트 확인</TButton> */}
        {/* <Button onPress={setNotification}>setNotification</Button>
        <Button onPress={registerNotification}>registerNotification</Button> */}
      </Box>
    </>
  );
}
