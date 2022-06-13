import { Box, ScrollView, Text } from "native-base";
import React from "react";
import * as Updates from "expo-updates";
import { Dialog } from "react-native-alert-notification";
import TButton from "../../components/TButton";

export default function Settings() {
  const handleUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        Dialog.show({
          title: "최신 버전",
          type: "SUCCESS",
          textBody: "App이 최신 버전입니다",
          button: "확인",
        });
      }
    } catch (e) {
      // handle or log error
      console.log(e);
    }
  };

  console.log(Updates.manifest);

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        {/* <Text>Settings</Text> */}
        <SettingItem cat="App Version" val={Updates.manifest.version} />
        <SettingItem cat="Release Channel" val={Updates.releaseChannel} />
        <SettingItem cat="SDK Version" val={Updates.manifest.sdkVersion} />
        <TButton onPress={handleUpdate} mt={4}>
          업데이트 확인
        </TButton>
      </ScrollView>
    </>
  );
}

const SettingItem = ({ cat, val }) => (
  <Box
    flexDir="row"
    alignItems="center"
    justifyContent="space-between"
    py={3}
    borderBottomColor="gray.200"
    borderBottomWidth={1}
  >
    <Text fontSize="md">{cat}</Text>
    <Text fontSize="lg" color="primary.500">
      {val}
    </Text>
  </Box>
);
