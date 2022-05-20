import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Box, HStack, ScrollView, Switch, Text } from "native-base";
// import { Popup } from "popup-ui";
import React, { useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import TButton from "../../tui/TButton";
import TTextField from "../../tui/TTextField";

export default function UserUpdate() {
  const { user, setUser } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [adAgree, setAdAgree] = useState(user.adAgree);

  const handleUpdate = async () => {
    try {
      const result = await axios({
        url: "/users/" + user.id,
        method: "PUT",
        data: {
          username,
          email,
          name,
          adAgree,
          phoneNumber,
        },
      });

      setUser(result.data);
      navigation.goBack();
    } catch (e) {
      console.log(e);
      // await Popup.show({
      //   type: "Danger",
      //   title: "개인정보 수정 실패",
      //   button: true,
      //   buttonText: "확인",
      //   textBody: "이미 사용중인 아이디/이메일주소입니다",
      //   callback: () => Popup.hide(),
      // });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <Text fontSize="xs" mb={1} ml={1}>
        아이디
      </Text>
      <TTextField value={username} setValue={setUsername} />
      <Text fontSize="xs" mt={2} mb={1} ml={1}>
        이메일 주소
      </Text>
      <TTextField value={email} setValue={setEmail} />
      <Text fontSize="xs" mt={2} mb={1} ml={1}>
        이름
      </Text>
      <TTextField value={name} setValue={setName} />
      <Text fontSize="xs" mb={1} ml={1}>
        전화번호
      </Text>
      <TTextField value={phoneNumber} setValue={setPhoneNumber} />

      {/* <HStack alignItems="center" justifyContent="space-between" space={4} mt={4} mb={6} px={2}>
        <Text>광고 수신 동의</Text>
        <Switch colorScheme="rose" isChecked={adAgree} onToggle={() => setAdAgree(!adAgree)} />
      </HStack> */}

      <Box mt={4}>
        <TButton onPress={handleUpdate}>개인정보 수정</TButton>
      </Box>
    </ScrollView>
  );
}
