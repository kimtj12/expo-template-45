import React from "react";
import { Feather, MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useTheme } from "native-base";

export default function TabBarIcon({ icon, focused, size = 22 }) {
  const { colors } = useTheme();
  // return <Ionicons name={icon} size={24} color={focused ? tui.colors["primary"].main : tui.colors["gray"][600]} />;
  return <AntDesign name={icon} size={size} color={focused ? colors.primary["500"] : colors.gray["500"]} />;
}
