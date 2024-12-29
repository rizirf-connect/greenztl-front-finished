import React from "react";
import { Drawer, Flex } from "antd";
import { MdLibraryBooks, MdStore, MdLogin, MdLogout } from "react-icons/md";
import { FaDiscord } from "@/icons/index";
import { PiWebhooksLogoFill } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillBell } from "react-icons/ai";
import { LuCalendarDays } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/slices/user.slice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

interface HeaderDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoginVisible: (isVisible: boolean) => void;
  setIsSignupVisible: (isVisible: boolean) => void;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({
  isOpen,
  setIsOpen,
  setIsLoginVisible,
  setIsSignupVisible,
}) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleNavigation = (url: string) => {
    push(url);
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setIsOpen(false);
    toast.success("Logged out successfully");
  };

  return (
    <Drawer onClose={() => setIsOpen(false)} open={isOpen} placement="left">
      <Flex flex={1} vertical justify="space-between" className="h-full">
        <ul id="list-sidebar" className="!items-baseline">
          <li>
            <p
              className="!flex items-center cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <PiWebhooksLogoFill size={20} className="mr-2" /> GreenzTL
            </p>
          </li>
          <li>
            <p
              className="!flex items-center cursor-pointer"
              onClick={() => handleNavigation("/series")}
            >
              <MdLibraryBooks size={20} className="mr-2" /> Series
            </p>
          </li>
          <li>
            <p
              className="!flex items-center cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <MdStore size={20} className="mr-2" /> Coin Shop
            </p>
          </li>
          <li>
            <p
              className="!flex items-center cursor-pointer"
              onClick={() => handleNavigation("/notifications")}
            >
              <AiFillBell size={20} className="mr-2" /> Notifications
            </p>
          </li>
          <li>
            <p
              className="!flex items-center cursor-pointer"
              onClick={() => handleNavigation("/updates")}
            >
              <LuCalendarDays size={20} className="mr-2" /> Updates
            </p>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://discord.gg/QAaKS8EBhj"
              onClick={() => setIsOpen(false)}
            >
              <p className="!flex items-center cursor-pointer">
                <FaDiscord size={20} className="mr-2" />
                Discord
              </p>
            </Link>
          </li>
        </ul>
        <ul id="list-sidebar" className="!items-baseline">
          {user.isLoggedIn ? (
            <>
              <li>
                <p
                  className="!flex items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <MdLogout size={20} className="mr-2" /> Logout
                </p>
              </li>
            </>
          ) : (
            <>
              <li>
                <p
                  className="!flex items-center cursor-pointer"
                  onClick={() => {
                    setIsLoginVisible(true);
                    setIsOpen(false);
                  }}
                >
                  <MdLogin size={20} className="mr-2" /> Sign in
                </p>
              </li>
              <li>
                <p
                  className="!flex items-center cursor-pointer"
                  onClick={() => {
                    setIsSignupVisible(true);
                    setIsOpen(false);
                  }}
                >
                  <MdLogin size={20} className="mr-2" /> Sign up
                </p>
              </li>
            </>
          )}
        </ul>
      </Flex>
    </Drawer>
  );
};

export default HeaderDrawer;
