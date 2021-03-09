import { Card } from "antd";
import { UserDetails } from "../Components/UserDetails";
import { useFirestoreUser } from "../Context/context";

export const HomePage = () => {
  const { user } = useFirestoreUser();

  return (
    <Card title="My profile">
      <UserDetails  user={user} />
    </Card>
  );
};
