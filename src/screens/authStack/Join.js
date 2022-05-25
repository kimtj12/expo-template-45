import { Center, Checkbox, Input, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { Dialog } from "react-native-alert-notification";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TButton from "../../components/TButton";
import useAuth from "../../hooks/useAuth";

export default function Join() {
  const { join } = useAuth();
  const permission = "user";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [groupValues, setGroupValues] = useState(false);

  const handleJoin = () => {
    if (password.length < 6) {
      Dialog.show({
        title: "비밀번호 확인",
        type: "DANGER",
        textBody: "비밀번호를 6자리 이상으로 입력해주세요",
        button: "확인",
      });
      return;
    }
    join({ username, password, email, name, phoneNumber, permission });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ padding: 15 }} extraScrollHeight={15}>
      <Text mb={2}>가입 정보 입력</Text>
      <Input placeholder="아이디" value={username} onChangeText={(e) => setUsername(e)} />
      <Input placeholder="비밀번호" value={password} onChangeText={(e) => setPassword(e)} type="password" />
      <Input placeholder="이메일주소" value={email} onChangeText={(e) => setEmail(e)} keyboardType="email-address" />
      <Input placeholder="이름" value={name} onChangeText={(e) => setName(e)} />
      <Input
        placeholder="전화번호"
        value={phoneNumber}
        onChangeText={(e) => setPhoneNumber(e)}
        keyboardType="phone-pad"
      />

      <TButton onPress={handleJoin} isDisabled={!username || !password || !email || !name || !phoneNumber}>
        회원가입
      </TButton>
    </KeyboardAwareScrollView>
  );
}
