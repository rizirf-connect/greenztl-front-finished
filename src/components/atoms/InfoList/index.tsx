import { Flex } from "antd";
import React from "react";

interface InfoListProps {
  label: string;
  items: string[];
  gap: number;
}

const InfoList: React.FC<InfoListProps> = ({ label, items, gap }) => {
  return (
    <Flex gap={gap} className="text-sm">
      <h1 className="text-xs md:text-sm font-semibold">
        {label}
        {items?.length > 1 && "s"}
      </h1>
      <Flex wrap="wrap" gap={8}>
        {items?.map((item, index) => (
          <p
            className="border text-xs md:text-base hover:border-Primary1000 px-2 rounded-lg"
            key={index}
          >
            {item}
          </p>
        ))}
      </Flex>
    </Flex>
  );
};

export default InfoList;
