import React, { useEffect, useState, useMemo } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import { User } from "../Models/UserModel";

export const FirestoreUserContext = React.createContext(null);

export const FirestoreUserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUser = async () => {
    setUserLoading(true);

    var user = firebase.auth().currentUser;
    if (user) {
      const fireStoreUser = await User.get(user.uid);
      if (fireStoreUser?.email) {
        setUser(fireStoreUser);
      } else {
        fetchUser();
      }
    }

    setUserLoading(false);
  };
  const listenUserChange = async () => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        //Register if new user
        if (
          user.metadata.creationTime ===
          user.metadata.lastSignInTime
        ) {
       
          await User.save(user);
        }

        fetchUser();
      } else {
        setUser(null);
      }
    });
  };
  useEffect(() => {
    listenUserChange();
  }, []);

  const value = useMemo(() => {
    return { user, userLoading, setUser, fetchUser };
  }, [user, userLoading]);

  return <FirestoreUserContext.Provider value={value} {...props} />;
};

export const useFirestoreUser = () => {
  const context = React.useContext(FirestoreUserContext);

  if (!context) throw new Error("User should be inside FirestoreUserContext");

  return context;
};
