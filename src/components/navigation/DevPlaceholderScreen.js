import { StatusBar } from "expo-status-bar";
import { Center, Text } from "native-base";

export default function DevPlaceholderScreen({ route }) {
  return (
    <Center flex={1}>
      <StatusBar style="dark" />
      <Text>Placeholder</Text>
      <Text>{route.name}</Text>
    </Center>
  );
}
