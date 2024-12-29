"use client";

import Heading from "@/components/atoms/heading";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import FreePlaySwiper from "@/components/atoms/freeplay";
import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import apiRequest from "@/utils/api-request";

interface Novel {
  seriesId: string;
  seriesName: string;
  thumbnail: string;
  chapterId: string;
  chapterName: string;
  updatedAt: Date;
}

const fetchRecentNovels = async (): Promise<Novel[]> => {
  const data = await apiRequest("/chapters/recently-updated", {
    method: "GET",
  });
  return data;
};

const RecentNovels = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recent-novels"],
    queryFn: fetchRecentNovels,
    retry: false,
  });

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="px-[4vw] lg:px-[10vw] py-4 sm:py-10 border-t border-Primary800">
      <Heading
        text="Recently Updated"
        className="dark:!bg-Black90 dark:!text-Primary300"
      />
      <FreePlaySwiper novels={data ?? []} isRecent />
    </div>
  );
};

export default RecentNovels;
