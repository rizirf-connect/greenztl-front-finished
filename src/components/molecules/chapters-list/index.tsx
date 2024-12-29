"use client";
import ChapterCard from "@/components/atoms/chapter-card";
import { Chapter } from "@/types";
import { Empty, Flex, Input } from "antd";
import { FC, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface ChaptersListProps {
  title: string;
  chapters: Chapter[];
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const ChaptersList: FC<ChaptersListProps> = ({
  chapters,
  title,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Sort chapters based on isAscending
  const sortedChapters = [...chapters].sort((a, b) =>
    isAscending
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter chapters based on search term
  const filteredChapters = sortedChapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display limited chapters if collapsed
  const displayedChapters = isCollapsed
    ? filteredChapters.slice(0, 2)
    : filteredChapters;

  return (
    <div className="p-4 bg-Gray200 dark:bg-Primary700 rounded-lg">
      <Flex align="center" justify="space-between">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        <Flex gap={24}>
          {/* Sort arrows */}
          <div
            onClick={() => setIsAscending(true)}
            className={`cursor-pointer ${
              isAscending ? "text-Primary500" : "text-Gray500"
            }`}
          >
            <FaArrowUp size={25} />
          </div>
          <div
            onClick={() => setIsAscending(false)}
            className={`cursor-pointer ${
              !isAscending ? "text-Primary500" : "text-Gray500"
            }`}
          >
            <FaArrowDown size={25} />
          </div>
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${
              !isCollapsed ? "rotate-180" : ""
            } transition-all cursor-pointer duration-500`}
          >
            <IoChevronDownOutline size={25} />
          </div>
        </Flex>
      </Flex>

      {/* Mini Search Bar */}
      <Input
        placeholder="Search chapters"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pt-10 max-w-80"
      />

      <Flex vertical gap={8} className="mt-4 max-h-[500px] overflow-y-scroll">
        {displayedChapters.length > 0 ? (
          displayedChapters.map((item) => (
            <ChapterCard
              _id={item._id}
              key={item._id}
              title={item.title}
              isPremium={item.isPremium}
              price={item.price}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <Empty />
        )}
      </Flex>
    </div>
  );
};

export default ChaptersList;
