import { Popover } from "antd";
import Button from "../button";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/user.slice";
import { toast } from "react-toastify";

interface User {
  name?: string;
  email?: string;
}

interface UserPopoverProps {
  user: User | null;
  open: boolean;
  children: ReactNode;
}

const UserPopover: React.FC<UserPopoverProps> = ({ user, open, children }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("Logged out successfully");
  };

  return (
    <Popover
      open={open}
      content={
        <div className="flex flex-col gap-4 p-4 text-center">
          {user && (
            <>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <Button
                text="Logout"
                onClick={handleLogout}
                className="text-white py-1 px-4 rounded-lg"
              />
            </>
          )}
        </div>
      }
      trigger="click"
    >
      {children}
    </Popover>
  );
};

export default UserPopover;
