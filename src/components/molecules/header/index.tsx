"use client";
import { Avatar, Flex, Switch } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderDrawer from "../drawer";
import Link from "next/link";
import LoginModal from "../login";
import SignupModal from "../signup";
import SearchNovels from "@/components/atoms/novelsearch";
import { FaUser } from "react-icons/fa";
import { AiFillBell, AiOutlineSun, AiOutlineMoon } from "react-icons/ai"; // Added sun and moon icons
import { LuCalendarDays } from "react-icons/lu";
import { useTheme } from "next-themes";
import UserPopover from "@/components/atoms/user-popover";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header: React.FC = React.memo(() => {
  const { push } = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const user = useSelector((state: any) => state.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onUserAvatarClick = useCallback(() => {
    user.isLoggedIn
      ? setPopoverVisible((prev) => !prev)
      : setIsLoginVisible(true);
  }, [user]);

  const handleThemeToggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="px-[4vw] xl:px-[10vw] py-2 border-b border-b-Black20 bg-white dark:bg-Black90">
      <Flex align="center" justify="space-between">
        <ul id="list" className="uppercase md:tracking-widest">
          <li onClick={() => push("/")}>
            <p className="px-2 lg:px-5 py-2 !flex items-center gap-2">
              <Image
                src="/images/greenztl.svg"
                alt="logo"
                width={25}
                height={25}
              />
              GreenzTL
            </p>
          </li>
          <li className="max-sm:hidden" onClick={() => push("/series")}>
            <p className="px-2 lg:px-5 py-2">Series</p>
          </li>
          <li className="max-sm:hidden" onClick={() => push("/")}>
            <p className="px-2 lg:px-5 py-2">Coin shop</p>
          </li>
          <li className="max-sm:hidden">
            <p className="px-2 lg:px-5 py-2">
              <Link
                className="!transition-none"
                target="_blank"
                href="https://discord.gg/QAaKS8EBhj"
              >
                Discord
              </Link>
            </p>
          </li>
        </ul>
        <Flex align="center" gap={12} className="max-sm:!gap-2">
          <SearchNovels />
          <div className="bg-Primary500 hover:bg-Primary900 p-1 rounded-lg cursor-pointer !hidden lg:!flex">
            <AiFillBell
              className="text-white"
              onClick={() => push("/notifications")}
              size={18}
            />
          </div>
          <div className="bg-Primary500 hover:bg-Primary900 p-1 rounded-lg cursor-pointer !hidden lg:!flex">
            <LuCalendarDays
              size={18}
              className="text-white"
              onClick={() => push("/updates")}
            />
          </div>
          {mounted && (
            <Switch
              checked={resolvedTheme === "dark"}
              onChange={handleThemeToggle}
              checkedChildren={<AiOutlineMoon size={20} />}
              unCheckedChildren={<AiOutlineSun size={20} />}
              className="!bg-Primary500 !hover:bg-Primary900 cursor-pointer"
            />
          )}
          <UserPopover user={user} open={popoverVisible && user.isLoggedIn}>
            <Avatar
              onClick={onUserAvatarClick}
              shape="square"
              className="!bg-Primary500 hover:!bg-Primary900 cursor-pointer !hidden lg:!flex"
              icon={<FaUser />}
              size={25}
            />
          </UserPopover>
          <div
            id="hamburger"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            className={`lg:hidden ${isDrawerOpen && "open"}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Flex>
      </Flex>

      <HeaderDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        setIsLoginVisible={setIsLoginVisible}
        setIsSignupVisible={setIsSignupVisible}
      />

      <LoginModal
        isVisible={isLoginVisible}
        onClose={() => setIsLoginVisible(false)}
        switchToSignup={() => {
          setIsLoginVisible(false);
          setIsSignupVisible(true);
        }}
      />
      <SignupModal
        isVisible={isSignupVisible}
        onClose={() => setIsSignupVisible(false)}
        switchToLogin={() => {
          setIsSignupVisible(false);
          setIsLoginVisible(true);
        }}
      />
    </header>
  );
});
Header.displayName = "Header";

export default Header;
