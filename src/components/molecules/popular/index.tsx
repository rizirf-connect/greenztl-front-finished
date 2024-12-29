"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "@/components/atoms/heading";
import PopularCard from "@/components/atoms/popularCard";
import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import { Empty } from "antd";
import apiRequest from "@/utils/api-request";

// Define a function to fetch recent novels
const fetchRecentNovels = async () => {
  const data = await apiRequest("series/recent", {
    method: "GET",
  });
  return data;
};

// Define a function to fetch most popular novels
const fetchMostPopularNovels = async () => {
  const data = await apiRequest("series/popular", {
    method: "GET",
  });
  return data;
};

// Define a function to fetch popular genres
const fetchPopularGenres = async () => {
  const data = await apiRequest("series/popular-genres", {
    method: "GET",
  });
  return data;
};

const PopularNovels = () => {
  const {
    data: recentNovels,
    error: errorRecent,
    isLoading: loadingRecent,
  } = useQuery({
    queryKey: ["recentNovels"],
    queryFn: fetchRecentNovels,
  });

  const {
    data: popularNovels,
    error: errorPopular,
    isLoading: loadingPopular,
  } = useQuery({
    queryKey: ["popularNovels"],
    queryFn: fetchMostPopularNovels,
  });

  const {
    data: popularGenres,
    error: errorGenres,
    isLoading: loadingGenres,
  } = useQuery({
    queryKey: ["popularGenres"],
    queryFn: fetchPopularGenres,
  });

  // Combine loading states
  const isLoading = loadingRecent || loadingPopular || loadingGenres;

  // Combine error states
  const hasError = errorRecent || errorPopular || errorGenres;

  // Combine empty states
  const noData =
    (!recentNovels || recentNovels.length === 0) &&
    (!popularNovels || popularNovels.length === 0) &&
    (!popularGenres || popularGenres.length === 0);

  return (
    <div className="px-[5vw] md:px-5 lg:px-[5vw] bg-Gray200 dark:bg-Black100 border-t border-Primary800 py-2 md:py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto">
      {isLoading && <DataLoader />}{" "}
      {/* Show single loader when any data is loading */}
      {hasError && <ErrorMessage />} {/* Show a single error message */}
      {!isLoading && !hasError && noData && <Empty />}{" "}
      {/* Show empty message if no data */}
      {/* Most Popular Novels */}
      {!isLoading && popularNovels && popularNovels.length > 0 && (
        <div>
          <Heading
            className="dark:!bg-Black100 dark:!text-Primary300"
            text="Most Popular Series"
          />
          {popularNovels.map((novel: any, index: number) => (
            <PopularCard
              key={novel._id}
              id={novel._id}
              index={index + 1}
              genres={novel?.genres}
              image={
                novel?.type === "banner" && novel?.images?.length > 0
                  ? novel.images[0]
                  : novel.thumbnail
              }
              rating={novel.ratings}
              title={novel.name}
              views={novel.views}
            />
          ))}
        </div>
      )}
      {/* Recent Novels */}
      {!isLoading && recentNovels && recentNovels.length > 0 && (
        <div>
          <Heading
            className="dark:!bg-Black100 dark:!text-Primary300"
            text="Recently Added"
          />
          {recentNovels.map((novel: any, index: number) => (
            <PopularCard
              key={novel._id}
              id={novel._id}
              index={index + 1}
              genres={novel?.genres}
              image={
                novel?.type === "banner" && novel?.images?.length > 0
                  ? novel.images[0]
                  : novel.thumbnail
              }
              rating={novel.ratings}
              title={novel.name}
              views={novel.views}
            />
          ))}
        </div>
      )}
      {/* Most Popular Genres */}
      {!isLoading && popularGenres && popularGenres.length > 0 && (
        <div>
          <Heading
            className="dark:!bg-Black100 dark:!text-Primary300"
            text="Most Popular Genres"
          />
          {popularGenres.slice(0, 3).map((item: any, index: number) => {
            const { novel } = item;
            return novel ? (
              <PopularCard
                key={novel._id}
                id={novel._id}
                index={index + 1}
                genres={[item.genre]}
                image={
                  novel?.images?.length > 0 ? novel.images[0] : novel.thumbnail
                }
                rating={novel.ratings}
                title={novel.name}
                views={novel.views}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default PopularNovels;
