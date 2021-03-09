/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import firebase from "firebase/app";

import App from "./App";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { routes } from "./Constants/routes";
import { User } from "./Models/UserModel";
import { act } from "react-dom/test-utils";

//Fix for Antd
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

//Auth Login function
async function login() {
  const username = "admin@example.org";
  const password = "123456";

  const {
    getByLabelText,
    getByText,
    container,
    history: { navigate },
  } = renderWithRouter(<App />);

  await navigate(routes.SIGN_IN);

  fireEvent.change(getByLabelText(/Email/i), { target: { value: username } });

  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: password },
  });

  fireEvent.click(getByText(/Submit/i));

  return { container, navigate };
}

test("before login rendering/navigating", async () => {
  const {
    container,
    history: { navigate },
  } = renderWithRouter(<App />);

  //Test Spin Before
  expect(container.innerHTML).toMatch("loader");

  await navigate(routes.SIGN_IN);
  expect(container.innerHTML).toMatch("Welcome to Immertec");

  await navigate(routes.SIGN_UP);
  expect(container.innerHTML).toMatch("Sign Up");
});

test("login sucessfully", async () => {
  const { container, navigate } = await login();

  await waitFor(async () => {
    setTimeout(async () => {
      expect(container).toHaveTextContent("Logout");
    }, 1000);
  });

  await navigate(routes.USERS);
});

test("list users", async () => {
  const { container, navigate } = await login();

  await waitFor(async () => {
    setTimeout(async () => {
      await navigate(routes.USERS);
      expect(container).toHaveTextContent("Users");
    }, 1000);
  });
});

