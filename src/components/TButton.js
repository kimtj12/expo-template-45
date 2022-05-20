import React, { useCallback } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { Button, useTheme } from "native-base";

export default function TButton({ children, onPress, haptic = true, ...props }) {
  const { colors } = useTheme();
  const handlePress = useCallback(
    (event) => {
      onPress?.(event);
      /* haptic feedback onPress */
      if (Platform.OS === "ios" && haptic) Haptics.selectionAsync();
    },
    [haptic, onPress]
  );

  return (
    <Button
      onPress={handlePress}
      style={{ fontSize: 20 }}
      _disabled={{
        backgroundColor: colors.gray["300"],
        _text: {
          color: colors.gray["700"],
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
