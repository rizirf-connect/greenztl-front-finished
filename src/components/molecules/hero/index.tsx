"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import ErrorMessage from "@/components/atoms/error-message";
import DataLoader from "@/components/atoms/data-loader";
import { Empty } from "antd";
import apiRequest from "@/utils/api-request";

const fetchHeroNovels = async () => {
  return await apiRequest("/series?type=banner", {
    method: "GET",
  });
};

export function HeroSection() {
  const { push } = useRouter();

  // Using useQuery to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ["heroNovels"],
    queryFn: fetchHeroNovels,
    retry: false,
  });

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="px-[4vw] px:mx-10 py-4 sm:py-10 bg-Gray300 dark:bg-Black100">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data.length > 0 ? (
          data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="cursor-grab dark:bg-Primary800">
              <div className="aspect-w-4 aspect-h-1">
                <img
                  className="object-cover object-top w-full h-full rounded-lg"
                  src={item.thumbnail}
                  alt={item.name}
                  onClick={() => push(`/series/${item._id}`)}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <Empty />
        )}
      </Swiper>
    </div>
  );
}

export default HeroSection;
