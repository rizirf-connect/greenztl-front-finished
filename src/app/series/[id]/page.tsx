"use client";
import Button from "@/components/atoms/button";
import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import InfoList from "@/components/atoms/InfoList";
import ChaptersList from "@/components/molecules/chapters-list";
import NovelStats from "@/components/molecules/novel-stats";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "antd";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import apiRequest from "@/utils/api-request";

const fetchChapters = async (seriesId: string) => {
  const data = await apiRequest(`/chapters?seriesId=${seriesId}`, {
    method: "GET",
  });
  return data;
};

const registerSeriesView = async (seriesId: string) => {
  const data = await apiRequest(`/series/${seriesId}/view`, {
    method: "PUT",
  });
  return data;
};

const SeriesDetailPage = () => {
  const { id: seriesId } = useParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const [isFreeCollapsed, setIsFreeCollapsedirst] = useState(false);
  const [isPremiumCollapsed, setIsPremiumCollapsedirst] = useState(true);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const {
    data: seriesData,
    isLoading: seriesLoading,
    error: seriesError,
  } = useQuery({
    queryKey: ["seriesView", seriesId],
    queryFn: () => registerSeriesView(seriesId as string),
    retry: false,
    enabled: !!seriesId,
  });
  // Query for chapters list
  const {
    data: chaptersData,
    isLoading: chaptersLoading,
    error: chaptersError,
  } = useQuery({
    queryKey: ["chapters", seriesId],
    queryFn: () => fetchChapters(seriesId as string),
    retry: false,
    enabled: !!seriesId,
  });

  if (seriesLoading || chaptersLoading) {
    return <DataLoader />;
  }

  if (seriesError || chaptersError) {
    return <ErrorMessage />;
  }

  const bannerAlternative =
    seriesData?.series?.type === "banner" &&
    seriesData?.series?.images?.length > 0;

  return (
    <div className="px-[4vw] lg:px-[10vw] py-4 md:py-10 dark:bg-Black100">
      {seriesLoading ? (
        <DataLoader />
      ) : (
        <Flex className="w-full max-md:flex-col gap-4 xl:gap-12">
          <Flex
            vertical
            gap={8}
            className="max-md:w-3/4 md:w-1/3 xl:w-1/5 mx-auto"
          >
            <Image
              src={
                bannerAlternative
                  ? seriesData.series.images[0]
                  : seriesData.series.thumbnail
              }
              alt="img"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-lg w-full h-80"
            />
            {seriesData.series.schedule &&
              seriesData.series.schedule.length > 0 && (
                <Flex
                  gap={4}
                  justify="center"
                  align="center"
                  wrap="wrap"
                  className="mt-4"
                >
                  {seriesData.series.schedule &&
                    seriesData.series.schedule.length > 0 && (
                      <Flex
                        gap={4}
                        justify="center"
                        align="center"
                        wrap="wrap"
                        className="mt-4"
                      >
                        {weekdays.map((day, index) => (
                          <span
                            key={index}
                            className={`text-xs font-semibold ${
                              seriesData.series.schedule.includes(day)
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          >
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </Flex>
                    )}
                </Flex>
              )}
          </Flex>
          <Flex vertical gap={12} className="md:w-2/3 xl:w-4/5">
            <h1 className="text-lg md:text-2xl font-medium dark:text-Primary300">
              {seriesData.series.name}
              <p className="text-xs md:text-sm text-Primary1000 font-bold dark:text-Primary500">
                Author
              </p>
            </h1>
            <NovelStats
              comments={seriesData?.commentsCount || 0}
              numberOfReviwes={0}
              rating={seriesData.series.ratings}
              readingLists={seriesData.series.views}
            />
            <p className="text-sm md:text-[16px]">
              {seriesData.series.description}
            </p>
            <Flex vertical gap={4}>
              <InfoList
                label="Translator"
                items={[seriesData?.series?.translator?.name]}
                gap={12}
              />
              <InfoList
                label="Genre"
                items={seriesData.series.genres}
                gap={32}
              />
              <InfoList gap={46} label="Tag" items={seriesData.series.tags} />
            </Flex>
            <Flex gap={12} className="max-sm:!gap-3">
              {seriesData?.firstChapter?._id && (
                <Button
                  onClick={() =>
                    push(`${pathname}/${seriesData.firstChapter._id}`)
                  }
                  text="Read First"
                />
              )}
              <Button text="Read Recent" />
              {seriesData?.lastChapter?._id && (
                <Button
                  onClick={() =>
                    push(`${pathname}/${seriesData.lastChapter._id}`)
                  }
                  text="Read Last"
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
      <Flex vertical gap={24} className="mt-8 md:mt-20">
        {chaptersLoading ? (
          <DataLoader />
        ) : (
          <>
            <ChaptersList
              title="Premium Chapters"
              chapters={chaptersData.filter(
                (chapter: any) => chapter.isPremium
              )}
              isCollapsed={isPremiumCollapsed}
              setIsCollapsed={setIsPremiumCollapsedirst}
            />
            <ChaptersList
              title="Free Chapters"
              chapters={chaptersData.filter(
                (chapter: any) => !chapter.isPremium
              )}
              isCollapsed={isFreeCollapsed}
              setIsCollapsed={setIsFreeCollapsedirst}
            />
          </>
        )}
      </Flex>
    </div>
  );
};

export default SeriesDetailPage;
