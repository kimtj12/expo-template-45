import { useTheme, Text } from "native-base";

export default function TabBarText({ focused, title }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        marginTop: -4,
        fontSize: 10,
        color: focused ? colors.primary["500"] : colors.gray["500"],
        fontWeight: "bold",
      }}
    >
      {title}
    </Text>
  );
}
