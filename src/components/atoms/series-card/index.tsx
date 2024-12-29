"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface SeriesCardProps {
  id: string;
  image: string;
  description: string;
}

const SeriesCard: FC<SeriesCardProps> = ({ image, description, id }) => {
  const { push } = useRouter();
  return (
    <div
      id="cardBorder"
      onClick={() => push(`series/${id}`)}
      className="relative overflow-hidden hover:scale-95 duration-300 group rounded-lg cursor-pointer"
    >
      <div id="card-content">
        <Image
          src={image}
          alt="Series Image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-lg"
        />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 opacity-0 group-hover:opacity-100 duration-300">
          <h1 className="text-center font-semibold text-sm lg:text-base">
            {description.length < 100
              ? description
              : `${description.slice(0, 100)}...`}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
