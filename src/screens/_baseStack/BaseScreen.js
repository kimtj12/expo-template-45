import axios from "axios";
import { Text, View } from "native-base";
import React, { useState, useEffect, useCallback } from "react";

export default () => {
  const [list, setList] = useState([]);

  const getData = async () => {
    // const { data } = await axios({
    //   url: "/transports?" + query,
    // });
    // setList(data);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
