"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/atoms/error-message";
import DataLoader from "@/components/atoms/data-loader";
import apiRequest from "@/utils/api-request";
import { Empty } from "antd";

const fetchNovels = async () => {
  const data = await apiRequest("series?type=featured", {
    method: "GET",
  });
  return data;
};

const SecondaryHero = () => {
  const { push } = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: novels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredNovels"],
    queryFn: fetchNovels,
    retry: false,
  });

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="py-4 sm:py-10 px-5 border-t border-Primary800">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          540: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        id="secondary-hero"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {novels.length > 0 ? (
          novels?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className="rounded-lg cursor-grabbing my-2"
            >
              <div
                className="relative w-full text-center bg-cover bg-center rounded-lg overflow-hidden h-64 md:h-80 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                onClick={() => push(`/series/${item._id}`)}
              >
                <div className="absolute inset-0 bg-Black100 opacity-50"></div>
                <div className="relative z-10 p-5 text-white">
                  {activeIndex === index && (
                    <span className=" px-3 py-1 bg-Primary700 text-white text-sm rounded-full mb-4">
                      Featured Novels
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <Empty description="Featured Novels Not Found!" />
        )}
      </Swiper>
    </div>
  );
};

export default SecondaryHero;
