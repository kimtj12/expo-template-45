import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Box, Image, Input, Text, useTheme } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TButton from "../../components/TButton";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Box style={{ flex: 1, backgroundColor: "white" }} safeArea>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: "flex-start", padding: 15 }}>
        <Image
          source={require("./../../assets/img/logo-color.png")}
          alt="LOGO"
          // width={100}
          height={50}
          resizeMode="contain"
          mb={5}
          mt={20}
          mx="auto"
        />
        <Text textAlign="center" color="primary.500" fontSize="2xl" fontWeight="bold" mb={10} ml={1}>
          신팩닷컴 파트너
        </Text>
        <Input placeholder="아이디 (전화번호)" value={email} onChangeText={(text) => setEmail(text)} />
        <Input placeholder="비밀번호" value={password} onChangeText={(text) => setPassword(text)} type="password" />

        <TButton onPress={() => login(email, password)} isDisabled={!email || !password}>
          로그인
        </TButton>

        {/* <Box flexDir="row" justifyContent="flex-end">
          <Button variant="ghost" color="rose.600" onPress={() => navigation.navigate("FindUsername")}>
            아이디 찾기
          </Button>
          <Button variant="ghost" color="rose.600" onPress={() => navigation.navigate("FindPassword")}>
            비밀번호 찾기
          </Button>
        </Box> */}

        {!keyboardVisible && (
          <>
            <Text textAlign="center" color="gray.400" fontSize="sm" mb={4} mt="auto">
              아직 계정이 없으신가요?
            </Text>
            <TButton variant="subtle" onPress={() => navigation.navigate("Join")}>
              회원가입
            </TButton>
          </>
        )}
      </KeyboardAwareScrollView>
    </Box>
  );
}
