"use client";
import React, { useState, useCallback } from "react";
import { Input, List, Spin } from "antd";
import { IoMdSearch } from "@/icons/index";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import apiRequest from "@/utils/api-request";

interface Novel {
  _id: string;
  name: string;
}

interface SearchNovelsProps {
  isSeries?: boolean;
}

const SearchNovels: React.FC<SearchNovelsProps> = ({ isSeries = false }) => {
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Debounced function to call the search API
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await apiRequest(`series/search?keyword=${query}`, {
            method: "GET",
          });
          setSearchResults(response);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  // Handle input change and trigger search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle click on search result
  const handleSelect = (id: string) => {
    push(`/series/${id}`);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <Input
        suffix={<IoMdSearch />}
        className={`bg-white h-8 px-4  ${
          isSeries ? "flex" : "!hidden lg:!flex"
        }`}
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ borderRadius: "8px", borderColor: "#d9d9d9" }}
      />

      {/* Display dropdown with search results */}
      {loading ? (
        <div className="absolute w-fit bg-white shadow-lg rounded-lg mt-1 z-10 p-4 text-center">
          <Spin tip="Loading..." />
        </div>
      ) : searchResults.length > 0 ? (
        <div className="absolute bg-white w-fit shadow-lg rounded-lg mt-1 z-10 overflow-auto max-h-[200px] border border-Gray600">
          <List
            className="!hidden lg:!flex "
            dataSource={searchResults}
            renderItem={(novel: Novel) => (
              <List.Item
                onClick={() => handleSelect(novel._id)}
                className="cursor-pointer p-2 hover:bg-Gray100"
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {novel.name}
              </List.Item>
            )}
          />
        </div>
      ) : searchTerm && !loading ? (
        <div className="absolute w-fit bg-white shadow-lg rounded-lg mt-1 z-10 p-4 text-center dark:text-Primary1000">
          No results found.
        </div>
      ) : null}
      <div
        className={`bg-Primary500 hover:bg-Primary900 p-1 rounded-lg cursor-pointer ${
          isSeries ? "hidden" : "lg:!hidden"
        }`}
      >
        <IoMdSearch
          onClick={() => push("/series")}
          size={18}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default SearchNovels;
