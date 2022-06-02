import axios from "axios";
import { Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import qs from "qs";

export default function BaseScreen() {
  const [list, setList] = useState([]);

  const getData = async () => {
    const query = qs.stringify({
      _where: {
        _or: [
          { to: company, status: "finished" },
          { from: company, status: "finished" },
          { from: company, status: "moving" },
        ],
      },
      _limit: limit,
      date_gte: format(startDate, "yyyy-MM-dd"),
      date_lte: format(endDate, "yyyy-MM-dd"),
      _sort: "date:ASC,id:ASC",
    });

    const { data } = await axios({
      url: "/transports?" + query,
    });
    setList(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
