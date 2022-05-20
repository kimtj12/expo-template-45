import { useTheme } from "native-base";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

export default function TabBarText({ focused, title }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        paddingBottom: 4,
        marginTop: -4,
        fontSize: 10,
        color: focused ? colors.primary["500"] : colors.gray["500"],
        fontWeight: focused ? "bold" : "normal",
      }}
    >
      {title}
    </Text>
  );
}
