"use client";
import UpdatesCard from "@/components/atoms/updates-card";
import { Tabs, Empty, Pagination } from "antd";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import apiRequest from "@/utils/api-request";
import { Series } from "@/types";

// Define the interface for the fetched data
interface Chapter {
  _id: string;
  title: string;
  createdAt: Date;
}

interface SeriesWithChapters {
  series: Series;
  chapters: Chapter[];
}

// Fetch the chapters based on the selected day
const fetchChapters = async (day: string) => {
  const data = await apiRequest(`series/chapters?day=${day}`);
  return data;
};

const UpdatesPage = () => {
  const [activeDay, setActiveDay] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data, isLoading, error } = useQuery<SeriesWithChapters[], Error>({
    queryKey: ["chaptersandseries", activeDay],
    queryFn: () => fetchChapters(activeDay),
  });

  const daysOfWeek = [
    { label: "All", key: "" },
    { label: "Monday", key: "Monday" },
    { label: "Tuesday", key: "Tuesday" },
    { label: "Wednesday", key: "Wednesday" },
    { label: "Thursday", key: "Thursday" },
    { label: "Friday", key: "Friday" },
    { label: "Saturday", key: "Saturday" },
    { label: "Sunday", key: "Sunday" },
  ];

  const onChangeDay = (key: string) => {
    setActiveDay(key);
    setCurrentPage(1); // Reset to the first page when day is changed
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="px-2 md:px-8 lg:px-[8vw] xl:px-[15vw] py-4 bg-Gray200 dark:bg-Black100">
      <Tabs
        id="updates-tabs"
        onChange={onChangeDay}
        type="card"
        items={daysOfWeek.map((day) => ({
          label: day.label,
          key: day.key,
        }))}
        centered
      />

      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map(({ series, chapters }) => (
              <UpdatesCard
                key={series._id}
                id={series._id}
                imageSrc={
                  series?.type === "banner" &&
                  Array.isArray(series.images) &&
                  series.images.length > 0
                    ? series.images[0]
                    : series.thumbnail
                }
                altText={series.name}
                title={series.name}
                chapters={chapters.map((chapter) => ({
                  id: chapter._id,
                  title: chapter.title,
                  createdAt: chapter.createdAt,
                }))}
              />
            ))
          ) : (
            <Empty className="flex items-center justify-center min-h-[50vh]" />
          )}
        </div>
      )}

      {data && data.length > itemsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={data.length}
          onChange={onChangePage}
          className="flex justify-center !pt-10"
        />
      )}
    </div>
  );
};

export default UpdatesPage;
