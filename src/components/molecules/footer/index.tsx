"use client";
import { Flex } from "antd";
import React from "react";
import { FaDiscord, GoDotFill } from "@/icons/index";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { push } = useRouter();
  return (
    <footer className="bg-Gray900 dark:bg-Black90 py-4 sm:py-8 px-[4vw] md:px-[10vw]">
      <Flex vertical gap={16} align="center" justify="center">
        <a target="_blank" href="https://discord.gg/QAaKS8EBhj">
          <FaDiscord
            size={25}
            className="text-Gray500 hover:text-Gray700 cursor-pointer"
          />
        </a>
        <Flex
          gap={24}
          className="max-sm:!gap-2 text-Gray50 text-xs md:text-lg font-semibold "
        >
          <li
            onClick={() => push("/support/about")}
            className="cursor-pointer hover:text-Primary600 duration-300"
          >
            About
          </li>
          <li
            onClick={() => push("/support/contact")}
            className="cursor-pointer hover:text-Primary600 duration-300"
          >
            Contact Us
          </li>
          <li
            onClick={() => push("/support/faq")}
            className="cursor-pointer hover:text-Primary600 duration-300"
          >
            FAQs
          </li>
          <li
            onClick={() => push("/support/jobs")}
            className="cursor-pointer hover:text-Primary600 duration-300"
          >
            Jobs
          </li>
        </Flex>
        <Flex
          className="text-Gray700 dark:text-Gray300 text-sm border-t border-Gray500 pt-4 w-full max-sm:flex-col max-sm:items-center"
          justify="space-between"
        >
          <div>Copyright @GreenzTL 2024</div>
          <Flex align="center" gap={4}>
            <p
              onClick={() => push("/support/privacy-policy")}
              className="cursor-pointer"
            >
              Privacy Policy
            </p>
            <GoDotFill size={5} />
            <p
              onClick={() => push("/support/terms-of-service")}
              className="cursor-pointer"
            >
              Terms of Service
            </p>
          </Flex>
        </Flex>
      </Flex>
    </footer>
  );
};

export default Footer;
