import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useFirestoreUser } from "../Context/context";
import { layout, tailLayout } from "../Layouts/Sizes";
import { User } from "../Models/UserModel";

export const ProfileEditPage = ({ id }) => {
  const [form] = Form.useForm();
  const { user, fetchUser } = useFirestoreUser();

  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    const editableUser = await User.get(id);
    const userInfo = { ...editableUser, role: editableUser.role || "standard" };

    form.setFieldsValue(userInfo);
  };

  useEffect(() => {
    fetch();
  }, []);

  const onFinish = async (values) => {
    if (user?.role !== "admin" && values.role === "admin") {
      message.error("Unauthorized");
      return;
    }

    setLoading(true);

    try {
      await User.update(id, values);

      fetchUser();

      message.success("User update successfully!");

      window.history.back();
    } catch (error) {
      message.error(error?.message || "Error updating user");
    }

    setLoading(false);
  };

  return (
    <Card title="Edit profile">
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
            label="Nombre"
            name="displayName"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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

          {user?.uid === id && (
            <Form.Item
              label="Password"
              name="password"
              extra="Require recent authentication."
            >
              <Input.Password placeholder="Change password?" />
            </Form.Item>
          )}

          {user?.role === "admin" && (
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Select>
                <Select.Option key="admin" value="admin">
                  Admin
                </Select.Option>
                <Select.Option key="standard" value="standard">
                  Standard
                </Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    </Card>
  );
};
