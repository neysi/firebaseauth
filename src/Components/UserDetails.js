import { Link } from "@reach/router";
import { Descriptions } from "antd";
import React from "react";

export const UserDetails = ({ user }) => {
  return (
    <React.Fragment>
      <Descriptions
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Name">
          {user?.displayName ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {user?.phone ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="ID">{user?.uid}</Descriptions.Item>
        <Descriptions.Item label="Edit">
          <Link to={`/users/${user?.uid}/edit`}>Edit Profile</Link>
        </Descriptions.Item>
      </Descriptions>
    </React.Fragment>
  );
};
