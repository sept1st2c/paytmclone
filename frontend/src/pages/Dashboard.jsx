import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { UsersComponent } from "../components/UsersComponent";

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <UsersComponent />
      </div>
    </div>
  );
};
