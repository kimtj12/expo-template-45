import React, { createContext, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useToast } from "native-base";
import qs from "qs";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const toast = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [permission, setPermission] = useState(null);

  // Per App
  const [settings, setSettings] = useState({});
  const [shop, setShop] = useState({});

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  };

  const onAppStart = async () => {
    const _jwt = await AsyncStorage.getItem("jwt");

    if (!_jwt) {
      logout();
      setIsInitialized(true);
      return;
    }

    try {
      const { data } = await axios({
        url: "/users/me",
        headers: { Authorization: "Bearer " + _jwt },
      });

      await initUser(_jwt, data);
    } catch (e) {
      logout();
      console.log("start error", JSON.stringify(e));
    } finally {
      setIsInitialized(true);
    }
  };

  const login = async (identifier, password) => {
    try {
      delete axios.defaults.headers.common["Authorization"];
      const { data } = await axios({
        url: "/auth/local",
        method: "POST",
        data: {
          identifier,
          password,
        },
      });

      await initUser(data.jwt, data.user);
    } catch (e) {
      console.log("login error", JSON.stringify(e));
      toast.show({
        title: "로그인 실패",
        description: "아이디/비밀번호를 확인해주세요",
        placement: "top",
      });
    }
  };

  const join = async ({ ...props }) => {
    try {
      console.log(props);
      setIsInitialized(false);
      const { data } = await axios({
        url: "/auth/local/register",
        method: "POST",
        data: props,
      });

      await initUser(data.jwt, data.user);
    } catch (e) {
      console.log("join error", JSON.stringify(e.response, null, 2));
      toast.show({
        title: "회원가입 실패",
        description: "잠시 후 다시 시도해주세요",
        placement: "top",
      });
    } finally {
      setIsInitialized(true);
    }
  };

  const initUser = async (jwt, user) => {
    console.log("USER INIT => ", user.id);
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
    await AsyncStorage.setItem("jwt", jwt);
    setUser(user);
    setIsLoggedIn(true);
    setPermission(user.permission ? user.permission : "user");

    // Do Things to set the app
    const params = qs.stringify({
      filters: {
        users_permissions_users: {
          id: {
            $eq: user.id,
          },
        },
      },
    });

    const { data } = await axios({
      url: "/shops?" + params,
    });
    // if (data.data.length === 0) {
    //   logout();
    //   return;
    // }
    setShop(data.data[0]);
  };

  return (
    <AuthContext.Provider
      value={{
        isInitialized,
        isLoggedIn,
        user,
        permission,
        onAppStart,
        login,
        logout,
        join,
        // Per App
        settings,
        shop,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
