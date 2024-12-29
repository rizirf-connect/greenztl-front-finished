import { formatViews } from "@/utils/viewFormat";
import { Flex } from "antd";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";

interface NovelStatsProps {
  rating: number;
  numberOfReviwes: number;
  readingLists: number;
  comments: number;
}

const NovelStats: React.FC<NovelStatsProps> = ({
  comments,
  rating,
  readingLists,
  numberOfReviwes,
}) => {
  return (
    <Flex
      wrap="wrap"
      gap={8}
      className="border border-Gray500 px-2 py-1 max-sm:!gap-1 bg-Gray200 dark:bg-Primary700 w-fit rounded-lg text-xs md:text-base"
    >
      {/* NU Star Rating */}
      <Flex align="center" gap={2}>
        <FaStar size={15} className="text-Primary700 dark:text-Primary200" />
        {rating} ({numberOfReviwes} Reviews)
      </Flex>

      {/* Number of People on Reading Lists */}
      <Flex align="center" gap={2}>
        <FaRegEye size={15} className="text-Primary700 dark:text-Primary200" />{" "}
        {formatViews(readingLists)} Reading Lists
      </Flex>

      {/* Number of Comments */}
      <Flex align="center" gap={2}>
        <MdInsertComment
          size={15}
          className="text-Primary700 dark:text-Primary200"
        />{" "}
        {comments} Comments
      </Flex>
    </Flex>
  );
};

export default NovelStats;
