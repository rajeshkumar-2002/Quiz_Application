import React, { useEffect, useState } from "react";
import AuthRoute from "./Authroute";
import HomeRoute from "./Homeroute";
import { getlocalstorage } from "../localstorage";
import { useSelector } from "react-redux";

function AppRoute() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const flag = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    checkAuth();
  }, [flag]);

  const checkAuth = async () => {
    const user = await getlocalstorage("user");
    if (user) {
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
    setisLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        isLoggedin ? (
          <HomeRoute />
        ) : (
          <AuthRoute />
        )
      ) : (
        <>
          <h1>Loading</h1>
        </>
      )}
    </>
  );
}

export default AppRoute;
