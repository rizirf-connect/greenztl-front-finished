"use client";
import React, { useCallback, useMemo } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import {
  InputNumber,
  Select,
  Popover,
  Slider,
  Button,
  Flex,
  Switch,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import ChapterComments from "@/components/molecules/comments";
import { useDispatch, useSelector } from "react-redux";

import {
  setFontStyle,
  setFontSize,
  setLineHeight,
  setFontFamily,
  setReaderWidth,
  setBackgroundColor,
  setTextColor,
} from "@/store/slices/styles.slice";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "@/components/atoms/data-loader";
import ErrorMessage from "@/components/atoms/error-message";
import apiRequest from "@/utils/api-request";
import { useTheme } from "next-themes";

const { Option } = Select;

const ChapterDetail = () => {
  const { chapter: chapterId } = useParams();
  const dispatch = useDispatch();
  const { back, push } = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const {
    fontStyle,
    fontSize,
    lineHeight,
    fontFamily,
    readerWidth,
    backgroundColor,
    textColor,
  } = useSelector((state: any) => state.style);
  const user = useSelector((state: any) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chapter", chapterId],
    queryFn: async () => {
      const data = await apiRequest(`/chapters/${chapterId}`, {
        method: "GET",
      });
      return data;
    },
    retry: false,
  });

  const handleFontStyleChange = (value: string) => {
    dispatch(setFontStyle(value));
  };

  const handleFontSizeChange = (increment: boolean) => {
    const newFontSize = +fontSize + (increment ? 1 : -1);
    if (newFontSize >= 10 && newFontSize <= 30) {
      dispatch(setFontSize(+newFontSize.toFixed(2)));
    }
  };

  const handleLineHeightChange = (increment: boolean) => {
    const newLineHeight = +lineHeight + (increment ? 0.2 : -0.2);
    if (newLineHeight >= 1 && newLineHeight <= 4) {
      dispatch(setLineHeight(+newLineHeight.toFixed(2)));
    }
  };

  const handleFontFamilyChange = (value: string) => {
    dispatch(setFontFamily(value));
  };

  const handleReaderWidthChange = (value: number) => {
    dispatch(setReaderWidth(`${value}`));
  };

  const handleBgColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBackgroundColor(event.target.value));
  };

  const handleTextColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setTextColor(event.target.value));
  };

  const contentStyle = useMemo(
    () => ({
      fontStyle: fontStyle,
      fontSize: `${fontSize}px`,
      lineHeight: lineHeight,
      fontFamily: fontFamily,
      width: `${readerWidth}%`,
      margin: "0 auto",
      backgroundColor: backgroundColor,
      color: textColor,
      padding: "20px",
      borderRadius: "8px",
    }),
    [
      fontStyle,
      fontSize,
      lineHeight,
      fontFamily,
      readerWidth,
      backgroundColor,
      textColor,
    ]
  );

  const content = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm">Font Style</label>
        <Select
          className="w-full"
          defaultValue={fontStyle}
          onChange={handleFontStyleChange}
        >
          <Option value="normal">Normal</Option>
          <Option value="italic">Italic</Option>
        </Select>
      </div>
      <div>
        <label className="block text-sm">Font Size</label>
        <div className="flex items-center justify-center">
          <Button onClick={() => handleFontSizeChange(false)}>-</Button>
          <InputNumber
            className="w-full mx-2 text-center flex-1"
            min={10}
            max={30}
            value={fontSize}
            readOnly
          />
          <Button onClick={() => handleFontSizeChange(true)}>+</Button>
        </div>
      </div>
      <div>
        <label className="block text-sm">Line Height</label>
        <div className="flex items-center justify-center">
          <Button onClick={() => handleLineHeightChange(false)}>-</Button>
          <InputNumber
            className="w-full mx-2 text-center flex-1"
            min={1}
            max={4}
            step={0.2}
            value={lineHeight}
            readOnly
          />
          <Button onClick={() => handleLineHeightChange(true)}>+</Button>
        </div>
      </div>
      <div>
        <label className="block text-sm">Font Family</label>
        <Select
          className="w-full"
          defaultValue={fontFamily}
          onChange={handleFontFamilyChange}
        >
          <Option value="Arial">Arial</Option>
          <Option value="Comic Mono">Comic Mono</Option>
          <Option value="Dyslexia">Dyslexia</Option>
          <Option value="Atkinson Hyperlegible">Atkinson Hyperlegible</Option>
        </Select>
      </div>

      <div>
        <label className="block text-sm">Reader Width (%)</label>
        <Slider
          min={50}
          max={100}
          value={Number(readerWidth)}
          onChange={handleReaderWidthChange}
        />
      </div>
      <div>
        <label className="block text-sm">Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={handleBgColorChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm">Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={handleTextColorChange}
          className="w-full"
        />
      </div>
    </div>
  );

  if (isLoading) {
    return <DataLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (
    !user?.purchasedChapters?.includes(chapterId) &&
    data?.currentChapter?.isPremium
  ) {
    return <DataLoader />;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-Gray500 flex sticky top-0 justify-between items-center p-2 md:px-5 border-b border-Gray700 z-50">
          <button
            onClick={() => back()}
            className="text-white flex items-center space-x-2 text-sm md:text-base"
          >
            <AiOutlineArrowLeft className="size-4 md:size-5" />
            <span>Back</span>
          </button>

          <h1 className="text-lg text-center md:text-xl font-bold">
            {data?.currentChapter?.title}
          </h1>

          <Flex gap={24}>
            <Switch
              checked={resolvedTheme === "dark"}
              onChange={handleThemeToggle}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              className="!bg-Primary500 !hover:bg-Primary900 cursor-pointer"
            />
            <button onClick={() => push("/")} className="text-white">
              <AiOutlineHome className="size-6" />
            </button>
          </Flex>
        </header>

        <main className="flex-grow py-5 overflow-y-auto pb-16 relative">
          <div
            className="prose prose-lg max-w-none"
            style={contentStyle}
            dangerouslySetInnerHTML={{ __html: data?.currentChapter?.content }}
          />
        </main>

        <footer className="flex bg-Gray500 sticky bottom-0 right-0 left-0 justify-between items-center p-2 md:px-5 border-t border-Gray700">
          {data?.previousChapter?._id ? (
            <button
              onClick={() => push(`${data.previousChapter._id}`)}
              className="bg-Gray800 hover:bg-Gray600 text-white py-1 md:py-2 px-2 md:px-4 rounded flex items-center"
            >
              <AiOutlineArrowLeft className="text-xs md:text-base inline size-5 mr-1" />
              Prev
            </button>
          ) : (
            <div></div>
          )}
          <Popover trigger="click" title="Customize Font" content={content}>
            <button className="bg-Gray800 hover:bg-Gray600 text-white py-1 md:py-2 px-2 md:px-4 rounded flex items-center">
              <IoMdSettings className="text-xs md:text-base inline size-5 mr-1" />
              Customize
            </button>
          </Popover>
          {data?.nextChapter?._id ? (
            <button
              onClick={() => push(`${data.nextChapter._id}`)}
              className="bg-Gray800 hover:bg-Gray600 text-white py-1 md:py-2 px-2 md:px-4 rounded flex items-center"
            >
              Next
              <AiOutlineArrowRight className="text-xs md:text-base inline size-5 ml-1" />
            </button>
          ) : (
            <div></div>
          )}
        </footer>
      </div>
      <ChapterComments />
    </>
  );
};

export default ChapterDetail;
