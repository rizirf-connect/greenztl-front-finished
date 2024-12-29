"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Empty } from "antd";

interface FreePlaySwiperProps {
  novels: any[any];
  isRecent?: boolean;
}

const FreePlaySwiper: React.FC<FreePlaySwiperProps> = ({
  novels,
  isRecent,
}) => {
  const { push } = useRouter();
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode]}
      breakpoints={{
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }}
    >
      {novels.length > 0 ? (
        novels.map((item: any, index: number) => (
          <SwiperSlide
            key={index}
            className="flex flex-col text-left !items-baseline rounded p-1 dark:bg-Black90"
            onClick={() => push(`series/${item._id}`)}
          >
            <div id="cardBorder" className="hover:scale-95 duration-300 w-full">
              <div id="card-content">
                <Image
                  src={
                    item?.type === "banner" && item?.images?.length > 0
                      ? item.images[0]
                      : item.thumbnail
                  }
                  alt="img"
                  width={228}
                  height={395}
                  className="border-2 border-transparent hover:border-Primary600 duration-500"
                />
              </div>
            </div>
            {isRecent && (
              <>
                <p className="text-sm font-semibold text-Black100 dark:text-white">
                  {item.chapterName}
                </p>
                <p className="text-xs text-Gray600">
                  {formatDistanceToNow(new Date(item.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </>
            )}
          </SwiperSlide>
        ))
      ) : (
        <Empty />
      )}
    </Swiper>
  );
};

export default FreePlaySwiper;
