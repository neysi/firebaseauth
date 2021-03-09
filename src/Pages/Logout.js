import { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import { navigate } from "@reach/router";
import { routes } from "../Constants/routes";

export const Logout = () => {
  const logout = async () => {
    await firebase.auth().signOut();
    navigate(routes.HOME);
  };
  useEffect(() => {
    logout();
  }, []);

  return null;
};
