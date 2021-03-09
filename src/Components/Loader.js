import React, { useEffect } from "react";
import { Spin } from "antd";
import { routes } from "../Constants/routes";

import { navigate } from "@reach/router";

import firebase from "firebase/app";
import "firebase/auth";

export const Loader = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigate(routes.PROFILE);
      } else {
        navigate(routes.SIGN_IN);
      }
    });
  },[]);

  return <Spin className="loader" spinning={true} />;
};


