"use client";
import SearchNovels from "@/components/atoms/novelsearch";
import SeriesCard from "@/components/atoms/series-card";
import SeriesFilters from "@/components/atoms/series-filters";
import { Flex } from "antd";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import apiRequest from "@/utils/api-request";

interface SeriesItem {
  _id: string;
  thumbnail: string;
  description: string;
  type: string;
  images: string[];
  name: string;
}

const fetchSeries = async (filters: {
  status: string;
  genre: string[];
  sort: string;
  order: string;
}) => {
  const data = await apiRequest(
    `/series?status=${filters.status}&genre=${filters.genre.join(",")}&sort=${
      filters.sort
    }&order=${filters.order}`,
    {
      method: "GET",
    }
  );
  return data;
};

const Series: React.FC = () => {
  // Filter state management
  const [sort, setSort] = useState<string>("views");
  const [status, setStatus] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("desc");

  const {
    data: series,
    isLoading,
    error,
  } = useQuery<SeriesItem[], Error>({
    queryKey: ["series", { status, genres, sort, order }],
    queryFn: () => fetchSeries({ status, genre: genres, sort, order }),
  });

  if (error) {
    return <ErrorMessage />;
  }

  console.log(series);

  return (
    <Flex
      vertical
      gap={12}
      className="px-[4vw] lg:px-[15vw] py-5 dark:bg-Black100"
    >
      <SearchNovels isSeries />
      <SeriesFilters
        sort={sort}
        setSort={setSort}
        status={status}
        setStatus={setStatus}
        genres={genres}
        setGenres={setGenres}
        order={order}
        setOrder={setOrder}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-4 md:mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center col-span-2 md:col-span-4">
            <DataLoader />
          </div>
        ) : (
          series?.map((item) => (
            <SeriesCard
              key={item._id}
              id={item._id}
              image={
                item.type === "banner" && item.images.length > 0
                  ? item.images[0]
                  : item.thumbnail
              }
              description={
                item.name ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, reiciendis!"
              }
            />
          ))
        )}
      </div>
    </Flex>
  );
};

export default Series;
