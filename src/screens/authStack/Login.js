import { Actionsheet, Box, Button, Center, Text, useDisclose, useToast } from "native-base";
import React, { useState, useEffect } from "react";

export default function Login() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Center flex={1}>
      <Button
        onPress={() =>
          toast.show({
            title: "HIHI",
            description: "Hello world",
            placement: "top",
          })
        }
      >
        Show Toast
      </Button>

      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
