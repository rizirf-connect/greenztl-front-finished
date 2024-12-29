import { Flex } from "antd";
import Image from "next/image";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

interface ChapterProps {
  id: string;
  title: string;
  createdAt: Date;
}

interface UpdatesCardProps {
  id: string;
  imageSrc: string;
  altText: string;
  title: string;
  chapters: ChapterProps[];
}

const UpdatesCard: React.FC<UpdatesCardProps> = ({
  id,
  imageSrc,
  altText,
  title,
  chapters,
}) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/series/${id}`);
  };

  return (
    <Flex
      className="bg-Gray300 dark:bg-Black90 p-1 rounded-lg border hover:border-Primary1000 max-sm:!gap-1 duration-300 hover:shadow"
      gap={16}
    >
      <div onClick={handleImageClick} className="cursor-pointer">
        <Image
          src={imageSrc}
          alt={altText}
          className="rounded-lg cursor-pointer hover:scale-105 duration-300 min-w-[65px] h-[100px]"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <Flex
        align="center"
        vertical
        justify="center"
        className="text-center space-y-2"
      >
        <h1 className="capitalize font-medium text-lg leading-tight">
          {title}
        </h1>
        <Flex gap={4} align="center" wrap="wrap">
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <Chapter
                seriesId={id}
                id={chapter.id}
                key={index}
                title={chapter.title}
                createdAt={chapter.createdAt}
              />
            ))
          ) : (
            <p className="text-sm text-Black40 dark:text-Gray100">
              No chapters added yet
            </p>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

interface ChapterComponentProps extends ChapterProps {
  seriesId: string;
}

const Chapter: React.FC<ChapterComponentProps> = ({
  title,
  createdAt,
  seriesId,
  id,
}) => {
  const router = useRouter();

  const handleChapterClick = () => {
    router.push(`/series/${seriesId}/${id}`);
  };

  return (
    <div
      onClick={handleChapterClick}
      className="max-md:text-[10px] md:text-xs bg-Primary100 border rounded-lg hover:bg-Primary200 duration-300 cursor-pointer px-1 lg:px-3 py-1 w-full flex-1"
    >
      <p className="text-Black80 font-medium">{title}</p>
      <span className="text-Black50 text-nowrap">
        {formatDistanceToNow(createdAt, { addSuffix: true })}
      </span>
    </div>
  );
};

export default UpdatesCard;
