import { Card } from "antd";
import { useEffect, useState } from "react";
import { UserDetails } from "../Components/UserDetails";
import { User } from "../Models/UserModel";

export const ProfileShowPage = ({ id }) => {
  const [user, setUser] = useState(null);

  const fetch = async () => {
    const data = await User.get(id);
    setUser(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Card title={user?.displayName || 'Loading...'}>
      <UserDetails user={user} />
    </Card>
  );
};
