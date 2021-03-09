import "./App.css";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";

import "firebase/auth";
import firebase from "firebase/app";

import { Router } from "@reach/router";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";

import { Logout } from "./Pages/Logout";
import { Loader } from "./Components/Loader";
import { config } from "./config";
import { HomePage } from "./Pages/HomePage";
import { UsersPage } from "./Pages/UsersPage";
import { FirestoreUserProvider } from "./Context/context";
import { ProfileEditPage } from "./Pages/ProfileEditPage";
import AppLayout from "./Layouts/AppLayout";
import { routes } from "./Constants/routes";
import { ProfileShowPage } from "./Pages/ProfileShowPage";


function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn }) => {
          return isSignedIn ? (
            <FirestoreUserProvider>
              <AppLayout>
                <Router>
                  <Loader path={routes.HOME} />
                  <HomePage path={routes.PROFILE} />
                  <ProfileShowPage path={`${routes.USERS}/:id`} />
                  <ProfileEditPage path={`${routes.USERS}/:id/edit`} />
                  <UsersPage path={routes.USERS} />
                  <Logout path={routes.LOGOUT} />
                </Router>
              </AppLayout>
            </FirestoreUserProvider>
          ) : (
            <FirestoreUserProvider>
              <Router>
                <Loader path={routes.HOME} />
                <SignInPage path={routes.SIGN_IN} />
                <SignUpPage path={routes.SIGN_UP} />
                <Logout path={routes.LOGOUT} />
              </Router>
            </FirestoreUserProvider>
          );
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  );
}

export default App;
