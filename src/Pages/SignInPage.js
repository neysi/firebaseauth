import { Form, Input, Button, Card, message, Spin } from "antd";

import { Link, navigate } from "@reach/router";
import AuthLayout from "../Layouts/AuthLayout";

import firebase from "firebase/app";
import "firebase/auth";
import { layout, tailLayout } from "../Layouts/Sizes";
import { useEffect, useState } from "react";
import { routes } from "../Constants/routes";


const SignInPage = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);

        navigate(routes.PROFILE)
      
    } catch (error) {
      message.error(
        error?.message || "Error Signing up with email and password"
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    return false;
  },[])

  return (
    <AuthLayout>
      <Card
        title="Sign in"
        bordered={false}
        style={{ margin: "20px auto", maxWidth: 550 }}
      >
        <p>Welcome to Immertec, please sign in to continue.</p>

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Spin spinning={loading}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <Form.Item {...tailLayout}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Form.Item>
          </Spin>
        </Form>
      </Card>
    </AuthLayout>
  );
};

export default SignInPage;
