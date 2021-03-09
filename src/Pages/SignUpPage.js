import { Link, navigate } from "@reach/router";
import { Form, Input, Button, Card, message, Spin } from "antd";
import AuthLayout from "../Layouts/AuthLayout";

import firebase from "firebase/app";
import "firebase/auth";
import { layout, tailLayout } from "../Layouts/Sizes";
import { routes } from "../Constants/routes";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);

      navigate(routes.PROFILE);
    } catch (error) {
      setLoading(false);
      message.error(
        error?.message || "Error Signing up with email and password"
      );
    }
  };

  useEffect(() => {
    return false;
  }, []);

  return (
    <AuthLayout>
      <Card
        title="Sign Up"
        bordered={false}
        style={{ margin: "20px auto", maxWidth: 550 }}
      >
        <Form
          form={form}
          name="basic"
          {...layout}
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
                  message: "Please input your email!",
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
              Do you have an account? <Link to="/login">Sign In</Link>
            </Form.Item>
          </Spin>
        </Form>
      </Card>
    </AuthLayout>
  );
};

export default SignUpPage;
