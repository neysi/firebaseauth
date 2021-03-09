import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

import firebase from "firebase/app";

// FireStore model for user CRUD

export class User {
  //Get Single user document
  static async get(uid) {
    if (!uid) return null;
    try {
      const userDocument = await firebase.firestore().doc(`users/${uid}`).get();

      return {
        uid,
        ...userDocument.data(),
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  }

  //Store new User
  static async save(user, extraData) {
    if (!user) return;

    const userRef = firebase.firestore().doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...extraData,
        });
      } catch (error) {
        console.error("Error creating user", error);
      }
    }
    return await this.get(user.uid);
  }

  //Get all documents
  static async all() {
    try {
      const users = await firebase.firestore().collection(`users`).get();

      return users.docs.map((doc) => {
        const data = doc.data();
        return { uid: doc.id, ...data };
      });
    } catch (error) {
      console.error("Error fetching user", error);
    }
  }

  static async update(uid, data) {
    const userRef = firebase.firestore().doc(`users/${uid}`);

 

    const { password, ...secureData } = data;

    return new Promise(async (resolve, reject) => {
      try {
        await userRef.update(secureData);

        //Update Firebase password
        if (password) {
          var user = firebase.auth().currentUser;
          //Validate current user id
          if (user != null && user.uid === uid) {
            await user.updatePassword(password);
          }
        }

        resolve(this.get( uid));
      } catch (error) {
        reject(error);
      }
    });
  }
}
