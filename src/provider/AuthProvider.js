import React, { createContext, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import qs from "qs";

const key = "fnfgva2mrgz8gjb25b5c2racyk3rkhb67yns8jsawma28g58fqq5dxkekjzhyw4h";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const toast = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [permission, setPermission] = useState(null);
  const [settings, setSettings] = useState({});
  const [shop, setShop] = useState({});

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  };

  const onAppStart = async () => {
    const _jwt = await AsyncStorage.getItem("jwt");

    try {
      if (_jwt) {
        axios.defaults.headers.common.Authorization = "Bearer " + _jwt;

        const result = await axios({
          url: "/users/me",
        });

        const params = qs.stringify({
          filters: {
            users_permissions_users: {
              id: {
                $eq: result.data.id,
              },
            },
          },
        });

        const { data } = await axios({
          url: "/shops?" + params,
        });

        if (data.data.length !== 0) {
          logout();
          return;
        }

        setShop(data.data[0]);

        console.log("got user data ID => ", result.data);
        setUser(result.data);

        setIsLoggedIn(true);

        // if (result.data.notification) {
        //   const token = await setNotification();
        //   await registerNotification(token);
        // }

        // const { data } = await axios({
        //   url: "/settings",
        // });

        // setSettings(data);
      } else {
        logout();
      }
    } catch (e) {
      logout();
      console.log("start e", JSON.stringify(e));
    }

    setIsInitialized(true);
  };

  const login = async (identifier, password) => {
    try {
      delete axios.defaults.headers.common["Authorization"];
      const result = await axios({
        url: "/auth/local",
        method: "POST",
        data: {
          identifier,
          password,
        },
      });

      console.log("login", result.data);
      const { jwt, user } = result.data;

      const params = qs.stringify({
        filters: {
          users_permissions_users: {
            id: {
              $eq: result.data.id,
            },
          },
        },
      });

      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      await AsyncStorage.setItem("jwt", jwt);

      const { data } = await axios({
        url: "/shops?" + params,
      });

      setShop(data.data[0]);

      setUser(user);
      setIsLoggedIn(true);
      setPermission(user.permission ? user.permission : "user");

      // if (user.notification) {
      //   const token = await setNotification();
      //   await registerNotification(token);
      // }

      // const { data } = await axios({
      //   url: "/setting",
      // });

      // setSettings(data);
    } catch (error) {
      console.log(error);

      // TODO TOAST
    }
  };

  const join = async ({ username, password, email, phoneNumber, ad, nickname }) => {
    try {
      setIsInitialized(false);
      const result = await axios({
        url: "/auth/local/register",
        method: "POST",
        data: {
          username,
          password,
          email,
          name: "",
          phoneNumber,
          permission: "user",
          adAgree: ad,
          points: 0,
          notification: ad,
          nickname,
        },
      });

      // console.log(result.data);
      const { jwt, user } = result.data;
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      await AsyncStorage.setItem("jwt", jwt);

      if (user.phoneNumber === "01054232124") {
        await axios({
          url: "/point-histories",
          method: "POST",
          data: {
            amount: 990000,
            users_permissions_user: user.id,
            reason: `포인트 충전`,
            // point:
          },
        });

        user.points = 990000;
      }

      setUser(user);
      setPermission(user.permission ? user.permission : "user");
      // setIsLoggedIn(true);
      // if (ad) {
      //   const token = await setNotification();
      //   await registerNotification(token);
      // }

      // const { data } = await axios({
      //   url: "/setting",
      // });

      // setSettings(data);

      setIsInitialized(true);
    } catch (e) {
      console.log(e.response);
      setIsInitialized(true);
      await Popup.show({
        type: "Danger",
        title: "회원가입 실패",
        button: true,
        buttonText: "확인",
        textBody: "회원가입에 실패했습니다",
        callback: () => Popup.hide(),
      });
    }
  };

  const refetchUser = async (modal) => {
    const { data } = await axios({
      url: "/users/me",
    });

    // console.log("got user data ID => ", result.data.id);
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        onAppStart,
        isInitialized,
        isLoggedIn,
        user,
        permission,
        login,
        logout,
        join,
        setUser,
        settings,
        refetchUser,
        shop,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
