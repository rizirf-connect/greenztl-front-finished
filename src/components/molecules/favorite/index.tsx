"use client";

import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import FreePlaySwiper from "@/components/atoms/freeplay";
import Heading from "@/components/atoms/heading";
import Segments from "@/components/atoms/segments";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import apiRequest from "@/utils/api-request";

const fetchRandomNovels = async (genre: string) => {
  const data = await apiRequest(`/series/random?genre=${genre}`, {
    method: "GET",
  });
  return data;
};

const FavoriteGenres = () => {
  const [genre, setGenre] = useState("fantasy");

  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredNovels", genre],
    queryFn: () => fetchRandomNovels(genre),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="px-[4vw] lg:px-[10vw] py-4 sm:py-10 border-t border-Primary800 bg-Gray200 dark:bg-Black100">
      <Heading
        className="dark:!bg-Black100 dark:text-Primary300"
        text="Something Random"
      />
      <Segments onSegmentChange={setGenre} />
      {isLoading ? (
        <DataLoader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <FreePlaySwiper novels={data} />
      )}
    </div>
  );
};

export default FavoriteGenres;
