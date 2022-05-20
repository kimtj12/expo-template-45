import { AntDesign } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, Linking } from "react-native";
import { Text, Button, Box, Divider } from "native-base";
import * as Haptics from "expo-haptics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
// import { parseMoney, parsePhone } from "../../helpers";

export default function MyScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  // const getData = async () => {
  //   const result = await axios({
  //     url: "/memberships",
  //     params: {
  //       users_permissions_user: user.id,
  //       active: true,
  //     },
  //   });

  //   console.log(result.data);
  //   setFreeList(result.data.filter((item) => item.paid === false));
  //   setPaidList(result.data.filter((item) => item.paid === true));
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (user.id) getData();
  //   }, [user])
  // );

  return (
    <>
      <StatusBar style="dark" />
      <Box style={{ backgroundColor: "#f1f3f5", padding: 20 }}>
        <Text color="primary.500" fontSize="2xl" fontWeight="bold" textAlign="center">
          {user.name}
        </Text>
        {/* <Text style={{ fontWeight: "bold" }} textAlign="center">
          {parsePhone(user.phoneNumber)} | {user.email}
        </Text> */}

        {/* <Divider /> */}
        {/* <Box flexDir="row" mt={4}>
          <Box flex={1}>
            <Text textAlign="center" fontSize="lg">
              {freeList.length}개
            </Text>
            <Text textAlign="center" fontSize="xs" color="gray.400">
              무료 리딩방
            </Text>
          </Box>

          <Box flex={1} borderRightWidth={1} borderRightColor="gray.300" borderLeftWidth={1} borderLeftColor="gray.300">
            <Text textAlign="center" fontSize="lg">
              {paidList.length}개
            </Text>
            <Text textAlign="center" fontSize="xs" color="gray.400">
              유료 리딩방
            </Text>
          </Box>

          <Box flex={1}>
            <Text textAlign="center" fontSize="lg">
              {user.points === 0 ? "0" : parseMoney(user.points)}P
            </Text>
            <Text textAlign="center" fontSize="xs" color="gray.400">
              보유 포인트
            </Text>
          </Box>
        </Box> */}
      </Box>

      <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
        {/* <MypageItem icon="solution1" title="마이리딩방 관리" onPress={() => alert("hi")} /> */}
        {/* <MypageItem icon="creditcard" title="결제내역" onPress={() => navigation.navigate("PaymentHistory")} /> */}
        {/* <MypageItem icon="sync" title="포인트 갱신" onPress={() => alert("hi")} /> */}
        <MypageItem icon="user" title="개인정보 수정" onPress={() => navigation.navigate("UserUpdate")} />
        {/* <MypageItem icon="reload1" title="공장 관리" onPress={() => alert("hi")} /> */}
        <MypageItem icon="customerservice" title="고객센터" onPress={() => Linking.openURL("tel:01045276164")} />

        <View style={{ height: 2, width: "100%", backgroundColor: "#f1f3f5", marginVertical: 10 }} />

        {/* <MypageItem icon="filetext1" title="이용약관" onPress={() => alert("hi")} /> */}
        <MypageItem icon="setting" title="설정" onPress={() => navigation.navigate("Settings")} />
        <MypageItem icon="logout" title="로그아웃" onPress={logout} />
      </ScrollView>
    </>
  );
}

const MypageItem = ({ icon, title, onPress }) => {
  const handlePress = useCallback(
    (event) => {
      onPress?.(event);
      if (Platform.OS === "ios") Haptics.selectionAsync();
    },
    [onPress]
  );

  return (
    <TouchableOpacity
      style={{
        padding: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 12,
      }}
      onPress={handlePress}
    >
      <View style={{ width: 20, height: 20, justifyContent: "center", alignItems: "center" }}>
        <AntDesign name={icon} size={20} />
      </View>
      <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 15 }}>{title}</Text>
      <View style={{ width: 20, height: 20, justifyContent: "center", alignItems: "center", marginLeft: "auto" }}>
        <AntDesign name="arrowright" size={20} />
      </View>
    </TouchableOpacity>
  );
};
