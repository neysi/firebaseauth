import { Link } from "@reach/router";
import { Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import { routes } from "../Constants/routes";
import { useFirestoreUser } from "../Context/context";
import { User } from "../Models/UserModel";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const { user } = useFirestoreUser();


  const fetch = async () => {
    const data = await User.all();
    setUsers(data);
  };

  useEffect(() => {
    fetch();

    return false;
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Name",
      dataIndex: "displayName",
      key: "displayName",
      render: (value, record) => (
        <Link to={`${routes.USERS}/${record.uid}`}>{value}</Link>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (value) => value || "standard",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    user?.role === "admin"
      ? {
          title: "Edit",
          dataIndex: "uid",
          key: "edit",
          render: (value) => (
            <Link to={`${routes.USERS}/${value}/edit`}>Editar</Link>
          ),
          fixed: "right",
        }
      : {},
  ];

  return (
    <Card title="Users">
      <Table
        scroll={{ x: "max-content" }}
        size="middle"
        rowKey="email"
        dataSource={users}
        columns={columns}
      />
    </Card>
  );
};
