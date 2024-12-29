"use client";
import { PopularCardProps } from "@/types";
import { Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar, GoDotFill } from "@/icons/index";
import { formatViews } from "@/utils/viewFormat";

const PopularCard: React.FC<PopularCardProps> = ({
  index,
  image,
  title,
  genres,
  views,
  rating,
  id,
}) => {
  const { push } = useRouter();
  // Split genres by comma or any other delimiter and limit to 3
  const genresList = genres?.slice(0, 3).join(" ");

  return (
    <Flex
      gap={32}
      align="center"
      className="cursor-pointer max-lg:!gap-2 border border-transparent hover:bg-Gray200 dark:hover:bg-Primary500 dark:hover:border-Gray900 hover:border-Primary1000 p-1 rounded-lg hover:shadow duration-300"
      onClick={() => push(`/series/${id}`)}
    >
      <Image
        src={image as string}
        className="rounded-xl"
        height={96}
        width={96}
        alt="img"
      />
      <p className="text-2xl font-medium max-sm:hidden dark:text-Primary200">
        {index}
      </p>
      <Flex vertical>
        <h1 className="text-sm sm:text-base font-medium">{title}</h1>
        <Flex
          gap={5}
          align="center"
          className="text-xs sm:text-[16px] text-Gray700 dark:text-Gray400"
        >
          {genresList} <GoDotFill size={5} /> <span>{formatViews(views)}</span>{" "}
          <GoDotFill size={5} />{" "}
          <Flex align="center" gap={2}>
            <FaStar size={10} color="var(--color-gray-1000)" />{" "}
            <span>{rating}%</span>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PopularCard;
